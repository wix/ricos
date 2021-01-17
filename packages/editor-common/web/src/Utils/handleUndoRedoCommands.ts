import { EditorState, convertToRaw, ContentState } from '@wix/draft-js';
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

// removing composition mode fixes mobile issues
function removeCompositionModeFromEditorState(editorState: EditorState) {
  if (editorState.isInCompositionMode()) {
    return EditorState.set(editorState, {
      inCompositionMode: false,
    });
  }
  return editorState;
}

function getType(type: string) {
  if (type === SOUND_CLOUD_TYPE) {
    return VIDEO_TYPE;
  } else if (PLUGINS_TO_IGNORE.includes(type)) {
    return IGNORE_TYPE;
  }
  return type;
}

// applies undo action on gallery items by fixing the changed item if it's source was broken
function applyActionForGalleryItems(currentItems, newItems) {
  const brokenItemIndex = newItems.findIndex((item, index) => {
    const currentItem = currentItems[index];
    return currentItem && !currentItem.tempData && item.tempData;
  });
  if (brokenItemIndex !== -1) {
    const newItem = newItems[brokenItemIndex];
    const {
      itemId,
      url,
      metadata: { type, height, width },
    } = currentItems[brokenItemIndex];
    const metadata = { ...newItem.metadata, type, height, width };
    newItems[brokenItemIndex] = { ...newItem, itemId, url, metadata, tempData: undefined };
    return newItems;
  }
}

// checks if an accordion pair changed and if so returns the changed pair index and an indictor (title or content)
function getChangedAccordionPairIndex(currentPairs, newPairs) {
  let item;
  let didChange = false;
  const changedPairIndex = newPairs.findIndex((newPair, index) => {
    const { key: newKey, title: newTitle, content: newContent } = newPair;
    const currentPair = currentPairs[index];
    const { key: currentKey, title: currentTitle, content: currentContent } = currentPair;
    if (currentKey !== newKey) {
      return true;
    }
    if (currentTitle.getCurrentContent() !== newTitle.getCurrentContent()) {
      item = 'title';
      return true;
    } else if (currentContent.getCurrentContent() !== newContent.getCurrentContent()) {
      item = 'content';
      return true;
    }
    return false;
  });
  if (changedPairIndex > -1) {
    didChange = true;
  }
  return { didChange, changedPairIndex, item };
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

function shouldReplaceVideoData(currentData, newData) {
  return (
    (!currentData.tempData && newData.tempData) ||
    (currentData.metadata && !newData.metadata) ||
    (currentData.src && !newData.src)
  );
}

function getEntityToReplace(blocks, entityMap, newBlocksEntitiesData): EntityToReplace {
  let entityToReplace: EntityToReplace = {};
  const didChange = blocks
    .filter(block => hasEntity(block, newBlocksEntitiesData, entityMap))
    .some(currentBlock => {
      const { key: blockKey } = currentBlock;
      const { didChange: didEntityChange, fixedData, shouldUndoAgain } = checkEntities(
        currentBlock,
        newBlocksEntitiesData,
        entityMap
      );
      if (didEntityChange) {
        entityToReplace = {
          blockKey,
          fixedData,
          didChange: !shouldUndoAgain,
        };
        return true;
      }
      return false;
    });

  if (!Object.keys(entityToReplace).length) {
    entityToReplace = { didChange };
  }
  return entityToReplace;
}

// fixes entities in inner EditorStates
function fixBrokenRicosStates(newEditorState: EditorState, editorState: EditorState) {
  const newContentState = convertToRaw(newEditorState.getCurrentContent());
  const contentState = convertToRaw(editorState.getCurrentContent());
  const newBlocksEntitiesData = createBlockEntitiesDataMap(newContentState);
  const { blocks, entityMap } = contentState;
  let didChange = false;
  if (didBlocksChange(blocks, newBlocksEntitiesData)) {
    didChange = true;
  } else {
    const { blockKey, fixedData, didChange: didEntityChange } = getEntityToReplace(
      blocks,
      entityMap,
      newBlocksEntitiesData
    );
    if (fixedData && blockKey) {
      replaceComponentData(newEditorState, blockKey, fixedData);
    }
    didChange = !!didEntityChange;
  }

  return {
    fixedEditorState: newEditorState,
    didChange,
  };
}

function handleAccordionEntity(currentData, newData) {
  const newPairs = newData.pairs.filter(pair => pair.key && pair.title && pair.content);
  // a pair with no key, title or content is broken
  const isBrokenContent = newPairs.length !== newData.pairs.length;
  // check if the config changed.
  if (!isEqual(currentData.config, newData.config) || isBrokenContent) {
    return {
      didChange: !isBrokenContent,
    };
  }
  // check if pairs were deleted.
  const { pairs: currentPairs } = currentData;
  if (newPairs.length !== currentPairs.length) {
    return { didChange: true };
  }

  // check if a pair changed and fix if necessary.
  const { didChange, changedPairIndex, item } = getChangedAccordionPairIndex(
    currentPairs,
    newPairs
  );
  if (didChange) {
    if (item) {
      const { fixedEditorState, didChange } = fixBrokenRicosStates(
        newPairs[changedPairIndex][item],
        currentPairs[changedPairIndex][item]
      );
      newPairs[changedPairIndex][item] = EditorState.createWithContent(
        fixedEditorState.getCurrentContent()
      );
      return {
        fixedData: {
          ...currentData,
          pairs: newPairs,
        },
        shouldUndoAgain: !didChange,
        didChange,
      };
    }
  }
  return { didChange };
}

// check table row's columns for a changed column.
function checkColumns(newRow, currentRow) {
  let isStyleChange = false;
  let didColumnChange = false;
  const columnIndex = Object.keys(newRow).find(columnKey => {
    const { content: newContent, ...newStyles } = newRow[columnKey];
    const { content: currentContent, ...currentStyles } = currentRow[columnKey];
    if (newContent.getCurrentContent() !== currentContent.getCurrentContent()) {
      return true;
    } else if (JSON.stringify(newStyles) !== JSON.stringify(currentStyles)) {
      isStyleChange = true;
      return true;
    }
    return false;
  });
  if (columnIndex || isStyleChange) {
    didColumnChange = true;
  }
  return { didColumnChange, columnIndex, isStyleChange };
}

// looks for a changed cell in the new content, if there is returns it's indices.
function getChangedTableCellIndex(newRows, currentRows) {
  const changedCell = { didCellChange: false, isStyleChange: false, row: '', column: '' };
  const row = Object.keys(newRows).find(rowKey => {
    const currentRow = currentRows[rowKey].columns;
    const newRow = newRows[rowKey].columns;
    if (!currentRow || Object.keys(newRow).length !== Object.keys(currentRow).length) {
      return true;
    }
    const { didColumnChange, columnIndex, isStyleChange } = checkColumns(newRow, currentRow);
    if (didColumnChange) {
      if (columnIndex) {
        changedCell.column = columnIndex;
      }
      changedCell.isStyleChange = isStyleChange;
      changedCell.didCellChange = true;
      return true;
    }
    return false;
  });
  if (row) {
    changedCell.row = row;
  }
  return changedCell;
}

function handleTableEntity(currentData, newData) {
  const { rows: newRows, ...newConfig } = newData.config;
  const { rows: currentRows, ...currentConfig } = currentData.config;

  // check if the config changed or a row has been added\deleted
  if (
    !isEqual(newConfig, currentConfig) ||
    Object.keys(newRows).length !== Object.keys(currentRows).length
  ) {
    return { didChange: true };
  }

  const { isStyleChange, didCellChange, row, column } = getChangedTableCellIndex(
    newRows,
    currentRows
  );
  if (didCellChange) {
    if (!isStyleChange) {
      const { fixedEditorState, didChange } = fixBrokenRicosStates(
        newRows[row].columns[column].content,
        currentRows[row].columns[column].content
      );
      newRows[row].columns[column].content = EditorState.acceptSelection(
        fixedEditorState,
        fixedEditorState.getSelection().merge({ hasFocus: false })
      );
      return {
        didChange,
        shouldUndoAgain: !didChange,
        fixedData: {
          ...currentData,
          config: {
            rows: newRows,
            ...currentConfig,
          },
        },
      };
    }
  }
  return { didChange: didCellChange };
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
    const items = applyActionForGalleryItems(currentData.items, newData.items);
    if (items) {
      return { ...newData, items };
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

function checkEntities(currentBlock, newBlocksEntitiesData, entityMap) {
  const {
    currentEntity: { type, data: currentData },
    newEntityData: newData,
  } = extractEntities(currentBlock, newBlocksEntitiesData, entityMap);
  let entityToReplace: EntityToReplace = { didChange: false };
  if (INNER_RICOS_TYPES.includes(type)) {
    entityToReplace = innerRicosDataFixers[type]?.(currentData, newData);
  } else if (!isEqual(currentData, newData)) {
    entityToReplace.didChange = true;
    const fixedData = entityDataFixers[getType(type)]?.(currentData, newData);
    if (fixedData) {
      entityToReplace = {
        ...entityToReplace,
        fixedData,
        shouldUndoAgain: true,
      };
    }
  }
  return entityToReplace;
}

function extractEntities(block, newBlocksEntitiesData, entityMap) {
  const { entityRanges = [], key: blockKey } = block;
  const entityKey = entityRanges[0]?.key;
  const currentEntity = entityMap[entityKey];
  const { entityData: newEntityData } = newBlocksEntitiesData[blockKey];
  return { currentEntity, newEntityData };
}

function hasEntity(block, newBlocksEntitiesData, entityMap) {
  const { currentEntity, newEntityData } = extractEntities(block, newBlocksEntitiesData, entityMap);
  return currentEntity && newEntityData;
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

function updateUndoEditorState(editorState: EditorState, newEditorState: EditorState) {
  const { fixedEditorState, didChange } = fixBrokenRicosStates(newEditorState, editorState);

  return didChange
    ? pushToRedoStack(
        removeCompositionModeFromEditorState(fixedEditorState),
        editorState.getCurrentContent()
      )
    : undo(fixedEditorState);
}

export const undo = (editorState: EditorState) => {
  if (editorState.getUndoStack().isEmpty()) {
    return editorState;
  }

  const newEditorState = shiftRedoStack(EditorState.undo(editorState));
  return updateUndoEditorState(editorState, newEditorState);
};

export const redo = (editorState: EditorState) => {
  if (editorState.getRedoStack().isEmpty()) {
    return editorState;
  }

  return removeCompositionModeFromEditorState(EditorState.redo(editorState));
};
