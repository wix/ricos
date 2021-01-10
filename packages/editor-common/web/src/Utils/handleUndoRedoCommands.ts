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
  return { changedPairIndex, item };
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

// fixes entities in inner EditorStates
function fixBrokenRicosStates(newEditorState: EditorState, editorState: EditorState) {
  const entityToReplace = getEntityToReplace(
    convertToRaw(newEditorState.getCurrentContent()),
    convertToRaw(editorState.getCurrentContent())
  );
  const { blockKey, fixedData, shouldUndoAgain } = entityToReplace;
  if (fixedData) {
    replaceComponentData(newEditorState, blockKey, fixedData);
  }

  return {
    fixedEditorState: newEditorState,
    shouldUndoAgain,
  };
}

function handleAccordionEntity(currentData, newData) {
  const newPairs = newData.pairs.filter(pair => pair.key && pair.title && pair.content);
  // a pair with no key, title or content is broken
  const isBrokenContent = newPairs.length !== newData.pairs.length;
  // check if the config changed.
  if (!isEqual(currentData.config, newData.config) || isBrokenContent) {
    return {
      shouldUndoAgain: isBrokenContent,
    };
  }
  // check if pairs were deleted.
  const { pairs: currentPairs } = currentData;
  if (newPairs.length !== currentPairs.length) {
    return { shouldUndoAgain: false };
  }

  // check if a pair changed and fix if necessary.
  const { changedPairIndex, item } = getChangedAccordionPairIndex(currentPairs, newPairs);
  if (changedPairIndex > -1) {
    if (item) {
      const { fixedEditorState, shouldUndoAgain } = fixBrokenRicosStates(
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
        shouldUndoAgain,
      };
    }
    return { shouldUndoAgain: false };
  }
}

// check table row's columns for a changed column.
function checkColumns(newRow, currentRow) {
  let isStyleChange = false;
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
  return { columnIndex, isStyleChange };
}

// looks for a changed cell in the new content, if there is returns it's indices.
function getChangedTableCellIndex(newRows, currentRows) {
  let column;
  const row = Object.keys(newRows).find(rowKey => {
    const currentRow = currentRows[rowKey].columns;
    const newRow = newRows[rowKey].columns;
    if (!currentRow || Object.keys(newRow).length !== Object.keys(currentRow).length) {
      return true;
    }
    const { columnIndex, isStyleChange } = checkColumns(newRow, currentRow);
    if (isStyleChange) {
      return true;
    } else if (columnIndex) {
      column = columnIndex;
      return true;
    }
    return false;
  });
  return { row, column };
}

function handleTableEntity(currentData, newData) {
  const { rows: newRows, ...newConfig } = newData.config;
  const { rows: currentRows, ...currentConfig } = currentData.config;

  // check if the config changed or a row has been added\deleted
  if (
    !isEqual(newConfig, currentConfig) ||
    Object.keys(newRows).length !== Object.keys(currentRows).length
  ) {
    return { shouldUndoAgain: false };
  }

  const { row, column } = getChangedTableCellIndex(newRows, currentRows);
  if (row) {
    if (column) {
      const { fixedEditorState, shouldUndoAgain } = fixBrokenRicosStates(
        newRows[row].columns[column].content,
        currentRows[row].columns[column].content
      );
      newRows[row].columns[column].content = EditorState.acceptSelection(
        fixedEditorState,
        fixedEditorState.getSelection().merge({ hasFocus: false })
      );
      return {
        shouldUndoAgain,
        fixedData: {
          ...currentData,
          config: {
            rows: newRows,
            ...currentConfig,
          },
        },
      };
    }
    return { shouldUndoAgain: false };
  }
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

function doesBlockExistInNewContentState(block, entityMap, newBlocksEntitiesData) {
  const { entityRanges = [], key: blockKey } = block;
  if (!(blockKey in newBlocksEntitiesData)) {
    return false;
  }
  const entityKey = entityRanges[0]?.key;
  const currentEntity = entityMap[entityKey];
  const { entityData: newEntity } = newBlocksEntitiesData[blockKey];
  return (currentEntity && newEntity) || (!currentEntity && !newEntity);
}

function getEntityToReplace(newContentState: RicosContent, contentState: RicosContent) {
  const newBlocksEntitiesData = createBlockEntitiesDataMap(newContentState);
  const { blocks, entityMap } = contentState;
  let entityToReplace;
  const didChange = blocks.some(currentBlock => {
    const { entityRanges = [], key: blockKey } = currentBlock;
    if (doesBlockExistInNewContentState(currentBlock, entityMap, newBlocksEntitiesData)) {
      const { block: newBlock, entityData: newData } = newBlocksEntitiesData[blockKey];
      if (!isEqual(currentBlock, newBlock)) {
        return true;
      }
      if (newData) {
        const entityKey = entityRanges[0]?.key;
        const currentEntity = entityMap[entityKey];
        const { type, data: currentData } = currentEntity;
        if (INNER_RICOS_TYPES.includes(type)) {
          entityToReplace = innerRicosDataFixers[type]?.(currentData, newData);
          if (entityToReplace) {
            entityToReplace.blockKey = blockKey;
            return true;
          }
        } else if (!isEqual(currentData, newData)) {
          const fixedData = entityDataFixers[getType(type)]?.(currentData, newData);
          if (fixedData) {
            entityToReplace = {
              blockKey,
              fixedData,
              shouldUndoAgain: true,
            };
          }
          return true;
        }
      }
      return false;
    }
    return true;
  });
  return entityToReplace || { shouldUndoAgain: !didChange };
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
  const { fixedEditorState, shouldUndoAgain } = fixBrokenRicosStates(newEditorState, editorState);

  return shouldUndoAgain
    ? undo(fixedEditorState)
    : pushToRedoStack(
        removeCompositionModeFromEditorState(fixedEditorState),
        editorState.getCurrentContent()
      );
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
