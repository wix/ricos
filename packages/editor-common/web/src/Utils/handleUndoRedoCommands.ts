import { EditorState, convertToRaw, ContentState } from '@wix/draft-js';
import { RicosContent } from 'ricos-content';
import { isEqual } from 'lodash';

const IMAGE_TYPE = 'wix-draft-plugin-image';
const VIDEO_TYPE = 'wix-draft-plugin-video';
const FILE_TYPE = 'wix-draft-plugin-file-upload';
const GALLERY_TYPE = 'wix-draft-plugin-gallery';
const ACCORDION_TYPE = 'wix-rich-content-plugin-accordion';
const IGNORE_CHANGE_TYPE = 'ignore';
const typesToIgnoreChanges = ['wix-rich-content-plugin-table'];

const getType = (type: string) => (typesToIgnoreChanges.includes(type) ? IGNORE_CHANGE_TYPE : type);

function removeCompositionModeFromEditorState(editorState: EditorState) {
  if (editorState.isInCompositionMode()) {
    return EditorState.set(editorState, {
      inCompositionMode: false,
    });
  }
  return editorState;
}

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

function didAccordionPairsChange(currentPairs, newPairs) {
  if (newPairs.length !== currentPairs.length) {
    return true;
  }
  return newPairs.some((pair, index) => {
    const { key } = pair;
    const currentPair = currentPairs[index];
    if (currentPair.key !== key) {
      return true;
    }
    const { title, content } = currentPair;
    return (
      title.getCurrentContent() !== pair.title.getCurrentContent() ||
      content.getCurrentContent() !== pair.content.getCurrentContent()
    );
  });
}

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

function handleAccordionEntity(currentData, newData) {
  const newPairs = newData.pairs.filter(pair => pair.key && pair.title && pair.content);
  const shouldUndoAgain =
    newPairs.length !== newData.pairs.length ||
    didAccordionPairsChange(currentData.pairs, newPairs);
  if (!isEqual(currentData.config, newData.config) || shouldUndoAgain) {
    return {
      shouldUndoAgain,
      fixedData: {
        ...currentData,
        config: newData.config,
      },
    };
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
  [FILE_TYPE]: (currentData, newData) => {
    const { config } = newData;
    return { ...currentData, config };
  },
  [GALLERY_TYPE]: (currentData, newData) => {
    const items = applyActionForGalleryItems(currentData.items, newData.items);
    if (items) {
      return { ...newData, items };
    }
  },
  /* eslint-disable no-unused-vars */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [IGNORE_CHANGE_TYPE]: (currentData, _) => {
    return { ...currentData };
  },
  /* eslint-enable no-unused-vars */
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
  const didChange = blocks.some(block => {
    const { entityRanges = [], key: blockKey } = block;
    if (doesBlockExistInNewContentState(block, entityMap, newBlocksEntitiesData)) {
      const { block: newBlock, entityData: newData } = newBlocksEntitiesData[blockKey];
      if (!isEqual(block, newBlock)) {
        return true;
      }
      if (newData) {
        const entityKey = entityRanges[0]?.key;
        const currentEntity = entityMap[entityKey];
        const { type, data: currentData } = currentEntity;
        if (type === ACCORDION_TYPE) {
          entityToReplace = handleAccordionEntity(currentData, newData);
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
  const newContentState = convertToRaw(newEditorState.getCurrentContent());
  const contentState = convertToRaw(editorState.getCurrentContent());

  const entityToReplace = getEntityToReplace(newContentState, contentState);
  const { blockKey, fixedData, shouldUndoAgain } = entityToReplace;
  if (fixedData) {
    replaceComponentData(newEditorState, blockKey, fixedData);
  }
  if (shouldUndoAgain) {
    return undo(newEditorState);
  }
  return pushToRedoStack(
    removeCompositionModeFromEditorState(newEditorState),
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

  const newEditorState = EditorState.redo(editorState);
  return removeCompositionModeFromEditorState(newEditorState);
};
