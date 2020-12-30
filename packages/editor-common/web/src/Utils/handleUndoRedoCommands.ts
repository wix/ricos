import { EditorState, convertToRaw, convertFromRaw, ContentState } from '@wix/draft-js';
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

function getChangedPairIndex(currentPairs, newPairs) {
  let hasOrderChanged = false;
  let isTitle = false;
  const changedPairIndex = newPairs.findIndex((pair, index) => {
    const { key } = pair;
    const currentPair = currentPairs[index];
    if (currentPair.key !== key) {
      hasOrderChanged = true;
      return true;
    }
    const { title, content } = currentPair;
    if (title.getCurrentContent() !== pair.title.getCurrentContent()) {
      isTitle = true;
      return true;
    }
    return content.getCurrentContent() !== pair.content.getCurrentContent();
  });
  return { changedPairIndex, hasOrderChanged, isTitle };
}

function createBlockEntitiesDataMap(
  contentState: RicosContent,
  filter?: (type: string) => boolean
) {
  const blockEntitiesDataMap = {};
  const { blocks, entityMap } = contentState;
  blocks.forEach(block => {
    const { entityRanges = [], type, key: blockKey } = block;
    const entity = entityMap[entityRanges[0]?.key];
    if (type === 'atomic') {
      block.text = ' ';
    }
    if (!filter || filter?.(entity?.type)) {
      blockEntitiesDataMap[blockKey] = { block, entityData: entity?.data };
    }
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

function fixBrokenInnerRicosStates(newEditorState: EditorState, editorState: EditorState) {
  const entityToReplace = getEntityToReplace(
    convertToRaw(newEditorState.getCurrentContent()),
    convertToRaw(editorState.getCurrentContent())
  );
  const { blockKey, fixedData, shouldUndoAgain } = entityToReplace;
  if (fixedData) {
    replaceComponentData(newEditorState, blockKey, fixedData);
  }
  return {
    newEditorState: EditorState.createWithContent(
      convertFromRaw(convertToRaw(newEditorState.getCurrentContent()))
    ),
    undoAgain: shouldUndoAgain,
  };
}

function handleAccordionEntity(currentData, newData) {
  const newPairs = newData.pairs.filter(pair => pair.key && pair.title && pair.content);
  const isBrokenContent = newPairs.length !== newData.pairs.length;

  if (!isEqual(currentData.config, newData.config) || isBrokenContent) {
    return {
      shouldUndoAgain: isBrokenContent,
      fixedData: {
        ...currentData,
        config: newData.config,
      },
    };
  }

  const { pairs: currentPairs } = currentData;
  if (newPairs.length !== currentPairs.length) {
    return { shouldUndoAgain: false };
  }

  const { changedPairIndex, hasOrderChanged, isTitle } = getChangedPairIndex(
    currentPairs,
    newPairs
  );
  if (changedPairIndex > -1) {
    if (hasOrderChanged) {
      return { shouldUndoAgain: false };
    }
    let shouldUndoAgain: boolean | undefined;
    if (isTitle) {
      const { newEditorState, undoAgain } = fixBrokenInnerRicosStates(
        newPairs[changedPairIndex].title,
        currentPairs[changedPairIndex].title
      );
      newPairs[changedPairIndex].title = newEditorState;
      shouldUndoAgain = undoAgain;
    } else {
      const { newEditorState, undoAgain } = fixBrokenInnerRicosStates(
        newPairs[changedPairIndex].content,
        currentPairs[changedPairIndex].content
      );
      newPairs[changedPairIndex].content = newEditorState;
      shouldUndoAgain = undoAgain;
    }
    return {
      fixedData: {
        ...currentData,
        pairs: newPairs,
      },
      shouldUndoAgain,
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

  return removeCompositionModeFromEditorState(EditorState.redo(editorState));
};
