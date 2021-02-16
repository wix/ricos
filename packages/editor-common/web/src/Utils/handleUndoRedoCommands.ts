import { EditorState, convertToRaw, ContentState } from '../index';
import {
  RicosContent,
  IMAGE_TYPE,
  VIDEO_TYPE,
  FILE_UPLOAD_TYPE,
  GALLERY_TYPE,
  ACCORDION_TYPE,
  TABLE_TYPE,
  SOUND_CLOUD_TYPE,
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

/* Utilities */

// removing composition mode fixes mobile issues
function removeCompositionModeFromEditorState(editorState: EditorState) {
  if (editorState.isInCompositionMode()) {
    return EditorState.set(editorState, {
      inCompositionMode: false,
    });
  }
  return editorState;
}

function removeFocus(editorState: EditorState) {
  return EditorState.set(editorState, {
    selection: editorState.getSelection().merge({ hasFocus: false }),
  });
}

function setLastChangeType(editorState: EditorState, lastChangeType: string) {
  return EditorState.set(editorState, { lastChangeType });
}

function preserveSelection(editorState: EditorState, newEditorState: EditorState) {
  return EditorState.forceSelection(
    newEditorState,
    editorState.getCurrentContent().getSelectionBefore()
  );
}

function getType(type: string) {
  if (type === SOUND_CLOUD_TYPE) {
    return VIDEO_TYPE;
  } else if (PLUGINS_TO_IGNORE.includes(type)) {
    return IGNORE_TYPE;
  }
  return type;
}

function extractEntities(block, newBlocksEntitiesData, entityMap) {
  const { entityRanges = [], key: blockKey } = block;
  const entityKey = entityRanges[0]?.key;
  const currentEntity = entityMap[entityKey];
  const newEntityData = newBlocksEntitiesData[blockKey]?.entityData;
  return { currentEntity, newEntityData };
}

function hasEntity(block, newBlocksEntitiesData, entityMap) {
  const { currentEntity, newEntityData } = extractEntities(block, newBlocksEntitiesData, entityMap);
  return currentEntity && newEntityData;
}

function shiftRedoStack(editorState: EditorState) {
  return EditorState.set(editorState, { redoStack: editorState.getRedoStack().shift() });
}

function pushToRedoStack(editorState: EditorState, contentState: ContentState) {
  return EditorState.set(editorState, { redoStack: editorState.getRedoStack().push(contentState) });
}

function replaceComponentData(editorState: EditorState, blockKey: string, componentData) {
  const currentContent = editorState.getCurrentContent();
  const entityKey = currentContent
    .getBlockMap()
    .get(blockKey)
    .getEntityAt(0);
  currentContent.replaceEntityData(entityKey, componentData);
}

// creates a map of blockKey to the block's data and entityData for easier access
function createBlockEntitiesDataMap(contentState: RicosContent) {
  const blockEntitiesDataMap = {};
  const { blocks, entityMap } = contentState;
  blocks.forEach(block => {
    const { entityRanges = [], type, key: blockKey } = block;
    const entity = entityMap[entityRanges[0]?.key];
    if (type === 'atomic') {
      block.text = ' ';
    }
    blockEntitiesDataMap[blockKey] = { block, entityData: entity?.data };
  });
  return blockEntitiesDataMap;
}

/* Compare EditorStates and fix (if needed) */

function checkEntities(currentBlock, newBlocksEntitiesData, entityMap) {
  const {
    currentEntity: { type, data: currentData },
    newEntityData: newData,
  } = extractEntities(currentBlock, newBlocksEntitiesData, entityMap);
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

function getEntityToReplace(blocks, entityMap, newBlocksEntitiesData): EntityToReplace {
  let entityToReplace: EntityToReplace = {};
  const didEntityChange = blocks
    .filter(block => hasEntity(block, newBlocksEntitiesData, entityMap))
    .some(currentBlock => {
      const { key: blockKey } = currentBlock;
      const { didChange, ...rest } = checkEntities(currentBlock, newBlocksEntitiesData, entityMap);
      entityToReplace = {
        blockKey,
        ...rest,
      };
      return didChange;
    });
  return didEntityChange ? entityToReplace : { shouldUndoAgain: true };
}

function didBlocksChange(blocks, newBlocksEntitiesData) {
  if (blocks.length !== Object.keys(newBlocksEntitiesData).length) {
    return true;
  }
  return blocks.some(block => {
    const { key: blockKey } = block;
    const { block: newBlock } = newBlocksEntitiesData[blockKey];
    return !newBlock || !isEqual(block, newBlock);
  });
}

// fixes entities in EditorStates
function fixBrokenRicosStates(
  newEditorState: EditorState,
  editorState: EditorState
): UndoOperationResult {
  const newContentState = convertToRaw(newEditorState.getCurrentContent());
  const contentState = convertToRaw(editorState.getCurrentContent());
  const newBlocksEntitiesData = createBlockEntitiesDataMap(newContentState);
  const { blocks, entityMap } = contentState;
  const result: UndoOperationResult = {
    fixedEditorState: preserveSelection(editorState, newEditorState),
    shouldUndoAgain: false,
  };
  if (!didBlocksChange(blocks, newBlocksEntitiesData)) {
    const { blockKey, fixedData, shouldUndoAgain } = getEntityToReplace(
      blocks,
      entityMap,
      newBlocksEntitiesData
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

function setPairItemChangeType(editorState, lastChangeType) {
  return setLastChangeType(
    EditorState.createWithContent(editorState.getCurrentContent()),
    lastChangeType
  );
}

function setChangeTypeForAccordionPairs(newPairs, lastChangeType) {
  return newPairs.map(pair => {
    return {
      key: pair.key,
      title: setPairItemChangeType(pair.title, lastChangeType),
      content: setPairItemChangeType(pair.content, lastChangeType),
    };
  });
}

function fixBrokenPair(newPairs, currentPairs, brokenPairIndex) {
  ['title', 'content'].forEach(item => {
    newPairs[brokenPairIndex][item] = setLastChangeType(
      removeFocus(currentPairs[brokenPairIndex][item]),
      'undo'
    );
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
  const { blocks, entityMap } = convertToRaw(editorState.getCurrentContent());
  const prevContentState = convertToRaw(prevEditorState.getCurrentContent());
  const prevBlocksEntitiesData = createBlockEntitiesDataMap(prevContentState);
  blocks
    .filter(block => hasEntity(block, prevBlocksEntitiesData, entityMap))
    .forEach(block => {
      const {
        currentEntity: { type, data: currentData },
        newEntityData: prevData,
      } = extractEntities(block, prevBlocksEntitiesData, entityMap);
      const fixedData = innerRicosChangeTypeSetters[type]?.(prevData, currentData);
      fixedData && replaceComponentData(prevEditorState, block.key, fixedData);
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
