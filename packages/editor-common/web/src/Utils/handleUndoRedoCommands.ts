import { EditorState, ContentBlock } from '../index';
import {
  shiftRedoStack,
  pushToRedoStack,
  removeCompositionModeFromEditorState,
  preserveSelection,
  replaceComponentData,
  removeFocus,
  setLastChangeType,
  getBlocksEntity,
  compareContentBlocks,
  doesEntityExistInBothStates,
} from './undoRedoDraftUtils';
import {
  IMAGE_TYPE,
  VIDEO_TYPE,
  FILE_UPLOAD_TYPE,
  GALLERY_TYPE,
  ACCORDION_TYPE,
  TABLE_TYPE,
  POLL_TYPE,
} from 'wix-rich-content-common';
import { isEqual } from 'lodash';

/* Type declarations */

const IGNORE_TYPE = 'ignore';
const INNER_RICOS_TYPES = [ACCORDION_TYPE, TABLE_TYPE];

// new plugins should be added while they are not supported
const PLUGINS_TO_IGNORE: string[] = [POLL_TYPE];

type EntityToReplace = {
  didChange?: boolean;
  shouldUndoAgain?: boolean;
  fixedData?: Record<string, unknown>;
  blockKey?: string;
};

type UndoOperationResult = {
  fixedEditorState: EditorState;
  shouldUndoAgain?: boolean;
};

function getType(type: string) {
  if (PLUGINS_TO_IGNORE.includes(type)) {
    return IGNORE_TYPE;
  }
  return type;
}

/* Compare EditorStates and fix (if needed) */

function checkEntities(currentBlock, contentState, newContentState) {
  const currentEntity = getBlocksEntity(currentBlock.key, contentState);
  const type = currentEntity.getType();
  const currentData = currentEntity.getData();
  const newData = getBlocksEntity(currentBlock.key, newContentState).getData();
  let entityToReplace: EntityToReplace = { didChange: false };
  if (INNER_RICOS_TYPES.includes(type)) {
    entityToReplace = innerRicosDataFixers[type]?.(currentData, newData);
  } else if (!isEqual(currentData, newData)) {
    const fixedData = entityDataFixers[getType(type)]?.(currentData, newData);
    entityToReplace.didChange = true;
    entityToReplace.fixedData = fixedData;
    entityToReplace.shouldUndoAgain = !!fixedData;
  }
  return entityToReplace;
}

function getEntityToReplace(newContentState, contentState): EntityToReplace {
  let entityToReplace: EntityToReplace = {};
  const didEntityChange = contentState
    .getBlockMap()
    .filter(block => doesEntityExistInBothStates(block, contentState, newContentState))
    .some(currentBlock => {
      const { key: blockKey } = currentBlock;
      const { didChange, ...rest } = checkEntities(currentBlock, contentState, newContentState);
      entityToReplace = {
        blockKey,
        ...rest,
      };
      return didChange;
    });
  return didEntityChange ? entityToReplace : { shouldUndoAgain: true };
}

// fixes entities in EditorStates
function fixBrokenRicosStates(
  newEditorState: EditorState,
  editorState: EditorState
): UndoOperationResult {
  const newContentState = newEditorState.getCurrentContent();
  const contentState = editorState.getCurrentContent();
  const result: UndoOperationResult = {
    fixedEditorState: preserveSelection(editorState, newEditorState),
    shouldUndoAgain: false,
  };
  if (!compareContentBlocks(contentState, newContentState)) {
    const { blockKey, fixedData, shouldUndoAgain } = getEntityToReplace(
      newContentState,
      contentState
    );
    if (fixedData && blockKey) {
      replaceComponentData(result.fixedEditorState, blockKey, fixedData);
    }
    result.shouldUndoAgain = shouldUndoAgain;
  }
  return result;
}

/* Accordion Entity Handling */

function didAccordionConfigChange(currentData, newData): boolean {
  const { pairs: currentPairs } = currentData;
  const { pairs: newPairs } = newData;
  return newPairs.length !== currentPairs.length || !isEqual(currentData.config, newData.config);
}

function checkAccordionPair(currentPair, newPair): string | boolean {
  const { key: newKey, title: newTitle, content: newContent } = newPair;
  const { key: currentKey, title: currentTitle, content: currentContent } = currentPair;
  return (
    (currentKey !== newKey && 'key') ||
    (currentTitle.getCurrentContent() !== newTitle.getCurrentContent() && 'title') ||
    (currentContent.getCurrentContent() !== newContent.getCurrentContent() && 'content')
  );
}

// checks if an accordion pair changed and if so returns the changed pair index and an indictor (title or content)
function getChangedAccordionPairIndex(currentPairs, newPairs) {
  let item;
  const changedPairIndex = newPairs.findIndex((newPair, index) => {
    const currentPair = currentPairs[index];
    item = checkAccordionPair(currentPair, newPair);
    return !!item;
  });
  return { didPairChange: changedPairIndex > -1, changedPairIndex, item };
}

function getFixedAccordionData(currentData, newData): EntityToReplace {
  const entityToReplace: EntityToReplace = { didChange: false };
  const { pairs: currentPairs } = currentData;
  const { pairs: newPairs } = newData;
  const { didPairChange, changedPairIndex, item } = getChangedAccordionPairIndex(
    currentPairs,
    newPairs
  );
  entityToReplace.didChange = didPairChange;
  if (item && item !== 'key') {
    const { fixedEditorState, shouldUndoAgain } = fixBrokenRicosStates(
      newPairs[changedPairIndex][item],
      currentPairs[changedPairIndex][item]
    );
    newPairs[changedPairIndex][item] = setLastChangeType(removeFocus(fixedEditorState), 'undo');
    entityToReplace.fixedData = {
      ...newData,
      pairs: newPairs,
    };
    entityToReplace.shouldUndoAgain = shouldUndoAgain;
  }
  return entityToReplace;
}

function setChangeTypeForAccordionPairs(newPairs, lastChangeType) {
  return newPairs.map(pair => {
    return {
      key: pair.key,
      title: setLastChangeType(
        EditorState.createWithContent(pair.title.getCurrentContent()),
        lastChangeType
      ),
      content: setLastChangeType(
        EditorState.createWithContent(pair.content.getCurrentContent()),
        lastChangeType
      ),
    };
  });
}

function fixBrokenPair(newPairs, currentPairs, brokenPairIndex) {
  const shouldSetChangeType = newPairs.length === 1;
  ['title', 'content'].forEach(item => {
    const newEditorState = removeFocus(currentPairs[brokenPairIndex][item]);
    newPairs[brokenPairIndex][item] = shouldSetChangeType
      ? setLastChangeType(newEditorState, 'undo')
      : newEditorState;
  });
  return newPairs;
}

function handleAccordionEntity(currentData, newData): EntityToReplace {
  const { pairs: newPairs } = newData;
  const brokenPairIndex = newPairs.findIndex(pair => !(pair.key && pair.title && pair.content));
  const didPairBreak = brokenPairIndex > -1;
  const entityToReplace: EntityToReplace = {
    didChange: didPairBreak || didAccordionConfigChange(currentData, newData),
    fixedData: {
      ...newData,
      pairs: didPairBreak ? fixBrokenPair(newPairs, currentData.pairs, brokenPairIndex) : newPairs,
    },
    shouldUndoAgain: didPairBreak,
  };
  return entityToReplace.didChange ? entityToReplace : getFixedAccordionData(currentData, newData);
}

/* Table Entity Handling */

function setCellChangeType(rows, rowKey, columnKey, lastChangeType) {
  rows[rowKey].columns[columnKey].content = setLastChangeType(
    removeFocus(rows[rowKey].columns[columnKey].content),
    lastChangeType
  );
}

function setChangeTypeForNewTableCells(currentRows, newRows, lastChangeType) {
  const rowKey = Object.keys(newRows).find(newRowKey => !currentRows[newRowKey]);
  if (rowKey) {
    Object.keys(newRows[rowKey].columns).forEach(columnKey => {
      setCellChangeType(newRows, rowKey, columnKey, lastChangeType);
    });
  } else {
    Object.keys(newRows).forEach(rowKey => {
      const columnKey = Object.keys(newRows[rowKey].columns).find(
        columnKey => !currentRows[rowKey].columns[columnKey]
      );
      columnKey && setCellChangeType(newRows, rowKey, columnKey, lastChangeType);
    });
  }
  return newRows;
}

// check table row's columns for a changed column.
function checkColumnEditorStates(newRow, currentRow) {
  return Object.keys(newRow).find(columnKey => {
    const { content: newContent } = newRow[columnKey];
    const { content: currentContent } = currentRow[columnKey];
    return newContent.getCurrentContent() !== currentContent.getCurrentContent();
  });
}

// looks for a changed cell in the new content, if there is returns it's indices.
function getChangedTableCellIndex(newRows, currentRows) {
  const changedCell: { row?: string; column?: string } = {};
  changedCell.row = Object.keys(newRows).find(rowKey => {
    const currentRow = currentRows[rowKey].columns;
    const newRow = newRows[rowKey].columns;
    changedCell.column = checkColumnEditorStates(newRow, currentRow);
    return !!changedCell.column;
  });
  return changedCell;
}

function getFixedTableData(currentData, newData): EntityToReplace {
  const entityToReplace: EntityToReplace = { didChange: false };
  const { rows: newRows, ...newConfig } = newData.config;
  const { rows: currentRows } = currentData.config;
  const { row, column } = getChangedTableCellIndex(newRows, currentRows);
  entityToReplace.didChange = !!(row && column);
  if (row && column) {
    const { fixedEditorState, shouldUndoAgain } = fixBrokenRicosStates(
      newRows[row].columns[column].content,
      currentRows[row].columns[column].content
    );
    newRows[row].columns[column].content = setLastChangeType(removeFocus(fixedEditorState), 'undo');
    entityToReplace.shouldUndoAgain = shouldUndoAgain;
    entityToReplace.fixedData = {
      ...newData,
      config: {
        rows: newRows,
        ...newConfig,
      },
    };
  }
  return entityToReplace;
}

function didTableConfigChange(currentData, newData) {
  const { rows: newRows, ...newConfig } = newData.config;
  const { rows: currentRows, ...currentConfig } = currentData.config;
  return (
    !isEqual(newConfig, currentConfig) ||
    Object.keys(newRows).length !== Object.keys(currentRows).length
  );
}

function didCellStyleChange(newRow, currentRow) {
  return Object.keys(newRow).some(columnKey => {
    /* eslint-disable no-unused-vars */
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { content: newContent, ...newStyles } = newRow[columnKey];
    const { content: currentContent, ...currentStyles } = currentRow[columnKey];
    /* eslint-enable no-unused-vars */
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return JSON.stringify(newStyles) !== JSON.stringify(currentStyles);
  });
}

function didTableRowStyleChange(currentData, newData) {
  const { rows: newRows } = newData.config;
  const { rows: currentRows } = currentData.config;
  return Object.keys(newRows).some(rowKey => {
    const currentRow = currentRows[rowKey].columns;
    const newRow = newRows[rowKey].columns;
    return (
      !currentRow ||
      Object.keys(newRow).length !== Object.keys(currentRow).length ||
      didCellStyleChange(newRow, currentRow)
    );
  });
}

function handleTableEntity(currentData, newData): EntityToReplace {
  const entityToReplace: EntityToReplace = {
    didChange:
      didTableConfigChange(currentData, newData) || didTableRowStyleChange(currentData, newData),
  };
  return entityToReplace.didChange ? entityToReplace : getFixedTableData(currentData, newData);
}

/* Data Fixers for breakable plugins */

// applies undo action on gallery items by fixing the changed item if it's source was broken
function applyActionForGalleryItems(currentItems, newItems) {
  let didChange = false;
  const fixedItems = newItems.map((newItem, index) => {
    const currentItem = currentItems[index];
    if (currentItem && !currentItem.tempData && newItem.tempData) {
      didChange = true;
      const {
        itemId,
        url,
        metadata: { type, height, width },
      } = currentItem;
      const metadata = { ...newItem.metadata, type, height, width };
      return { ...newItem, itemId, url, metadata, tempData: undefined };
    }
    return newItem;
  });
  return { fixedItems, didChange };
}

function shouldReplaceVideoData(currentData, newData): boolean {
  return (
    (!currentData.tempData && newData.tempData) ||
    (currentData.metadata && !newData.metadata) ||
    (currentData.src && !newData.src)
  );
}

const entityDataFixers = {
  [IMAGE_TYPE]: (currentData, newData) => {
    const { src, error } = currentData;
    if (src && !newData.src) {
      return { ...newData, src, error };
    }
  },
  [VIDEO_TYPE]: (currentData, newData) => {
    if (shouldReplaceVideoData(currentData, newData)) {
      const { config } = newData;
      return { ...currentData, config };
    }
  },
  [FILE_UPLOAD_TYPE]: (currentData, newData) => {
    const { config } = newData;
    return { ...currentData, config };
  },
  [GALLERY_TYPE]: (currentData, newData) => {
    const { fixedItems, didChange } = applyActionForGalleryItems(currentData.items, newData.items);
    if (didChange) {
      return { ...newData, items: fixedItems };
    }
  },
  [IGNORE_TYPE]: currentData => {
    return { ...currentData };
  },
};

const innerRicosDataFixers = {
  [ACCORDION_TYPE]: (currentData, newData) => handleAccordionEntity(currentData, newData),
  [TABLE_TYPE]: (currentData, newData) => handleTableEntity(currentData, newData),
};

const innerRicosChangeTypeSetters = {
  [ACCORDION_TYPE]: prevData => {
    return {
      ...prevData,
      pairs: setChangeTypeForAccordionPairs(prevData.pairs, 'redo'),
    };
  },
  [TABLE_TYPE]: (prevData, currentData) => {
    return {
      ...prevData,
      config: {
        ...prevData.config,
        rows: setChangeTypeForNewTableCells(currentData.config.rows, prevData.config.rows, 'redo'),
      },
    };
  },
};

/* Handle undo-redo calls */

function getContentStateForRedoStack(editorState: EditorState, prevEditorState: EditorState) {
  const prevContentState = prevEditorState.getCurrentContent();
  const contentState = editorState.getCurrentContent();
  contentState
    .getBlockMap()
    .filter(block => doesEntityExistInBothStates(block, contentState, prevContentState))
    .forEach((block: ContentBlock) => {
      const blockKey = block.getKey();
      const currentEntity = getBlocksEntity(blockKey, contentState);
      const type = currentEntity.getType();
      const currentData = currentEntity.getData();
      const prevData = getBlocksEntity(blockKey, prevContentState).getData();
      const fixedData = innerRicosChangeTypeSetters[type]?.(prevData, currentData);
      fixedData && replaceComponentData(prevEditorState, blockKey, fixedData);
    });
  return prevEditorState.getCurrentContent();
}

function updateUndoEditorState(editorState: EditorState, newEditorState: EditorState): EditorState {
  const { fixedEditorState, shouldUndoAgain } = fixBrokenRicosStates(newEditorState, editorState);
  return shouldUndoAgain
    ? undo(fixedEditorState)
    : pushToRedoStack(
        removeCompositionModeFromEditorState(fixedEditorState),
        getContentStateForRedoStack(fixedEditorState, editorState)
      );
}

export const undo = (editorState: EditorState): EditorState => {
  if (editorState.getUndoStack().isEmpty()) {
    return editorState;
  }
  const newEditorState = shiftRedoStack(EditorState.undo(editorState));
  return updateUndoEditorState(editorState, newEditorState);
};

export const redo = (editorState: EditorState): EditorState => {
  if (editorState.getRedoStack().isEmpty()) {
    return editorState;
  }
  return removeCompositionModeFromEditorState(EditorState.redo(editorState));
};
