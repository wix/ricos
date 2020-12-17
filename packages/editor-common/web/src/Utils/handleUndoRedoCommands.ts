/* eslint-disable no-case-declarations */
import { EditorState, convertToRaw } from '@wix/draft-js';
import { RicosContent } from 'ricos-content';
import { isEqual } from 'lodash';

const IMAGE_TYPE = 'wix-draft-plugin-image';
const VIDEO_TYPE = 'wix-draft-plugin-video';
const FILE_TYPE = 'wix-draft-plugin-file-upload';
const GALLERY_TYPE = 'wix-draft-plugin-gallery';
const ACCORDION_TYPE = 'wix-rich-content-plugin-accordion';
const typesToIgnoreChanges = ['wix-rich-content-plugin-table'];
const types = [
  GALLERY_TYPE,
  FILE_TYPE,
  IMAGE_TYPE,
  VIDEO_TYPE,
  ACCORDION_TYPE,
  ...typesToIgnoreChanges,
];

function createEditorStateWithoutComposition(editorState: EditorState) {
  if (editorState.isInCompositionMode()) {
    return EditorState.set(editorState, {
      inCompositionMode: false,
    });
  }
  return editorState;
}

function applyActionForGalleryItems(currentItems, newItems) {
  const currentItemMap = {};
  currentItems.forEach((item, index) => {
    const {
      itemId,
      url,
      metadata: { type, height, width },
      tempData,
    } = item;
    currentItemMap[index] = { itemId, url, metadata: { type, height, width }, tempData };
  });
  return newItems.map((item, index) => {
    const currentItem = currentItemMap[index];
    if (currentItem && !currentItem.tempData && item.tempData) {
      const { itemId, url, metadata: currentMetadata } = currentItem;
      const metadata = { ...item.metadata, ...currentMetadata };
      return { ...item, itemId, url, metadata, tempData: undefined };
    }
    return item;
  });
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

function createReplaceableEntitiesKeyMap(contentState: RicosContent) {
  const replaceableEntitiesMap = {};
  const { blocks, entityMap } = contentState;
  blocks.forEach(block => {
    const { entityRanges = [], type, key } = block;
    const entity = entityMap[entityRanges[0]?.key];
    if (type === 'atomic' && types.includes(entity?.type)) {
      replaceableEntitiesMap[key] = entity.data;
    }
  });
  return replaceableEntitiesMap;
}

function shouldReplaceVideoData(currentData, undoneData) {
  return (
    (!currentData.tempData && undoneData.tempData) ||
    (currentData.metadata && !undoneData.metadata) ||
    (currentData.src && !undoneData.src)
  );
}

function handleAccordionEntity(key: string, currentData, undoneData) {
  const newPairs = undoneData.pairs.filter(pair => pair.key && pair.title && pair.content);
  if (!isEqual(currentData.config, undoneData.config)) {
    return {
      key,
      shouldUndoAgain: false,
      newData: {
        ...currentData,
        config: undoneData.config,
      },
    };
  }
  if (
    newPairs.length !== undoneData.pairs.length ||
    didAccordionPairsChange(currentData.pairs, newPairs)
  ) {
    return {
      key,
      shouldUndoAgain: true,
      newData: {
        ...currentData,
      },
    };
  }
}

function handleEntity(key: string, type: string, currentData, undoneData) {
  let newData;

  switch (type) {
    case IMAGE_TYPE:
      const { src, error } = currentData;
      if (src && !undoneData.src) {
        newData = { ...undoneData, src, error };
      }
      break;
    case VIDEO_TYPE:
      if (!shouldReplaceVideoData(currentData, undoneData)) {
        break;
      }
    // eslint-disable-next-line no-fallthrough
    case FILE_TYPE:
      const { config } = undoneData;
      newData = { ...currentData, config };
      break;
    case GALLERY_TYPE:
      const items = applyActionForGalleryItems(currentData.items, undoneData.items);
      newData = { ...undoneData, items };
      break;
    default:
      newData = { ...currentData };
  }
  if (newData) {
    return {
      key,
      newData,
      shouldUndoAgain: isEqual(newData, currentData),
    };
  }
}

function getEntityToReplace(newContentState: RicosContent, contentState: RicosContent) {
  const replaceableEntitiesMap = createReplaceableEntitiesKeyMap(newContentState);
  const { blocks, entityMap } = contentState;
  let entityToReplace;
  blocks.some(block => {
    const { entityRanges = [], key } = block;
    const currentEntity = entityMap[entityRanges[0]?.key];
    if (key in replaceableEntitiesMap && currentEntity) {
      const { type, data: currentData } = currentEntity;
      const undoneData = replaceableEntitiesMap[key];

      if (type === ACCORDION_TYPE) {
        entityToReplace = handleAccordionEntity(key, currentData, undoneData);
        return !!entityToReplace;
      }

      if (!isEqual(currentData, undoneData)) {
        entityToReplace = handleEntity(key, type, currentData, undoneData);
        return !!entityToReplace;
      }
    }
    return false;
  });
  return entityToReplace;
}

function shiftRedoStack(editorState: EditorState) {
  return EditorState.set(editorState, { redoStack: editorState.getRedoStack().shift() });
}

function pushToRedoStack(editorState: EditorState, contentState: RicosContent) {
  return EditorState.set(editorState, { redoStack: editorState.getRedoStack().push(contentState) });
}

function replaceComponentData(editorState: EditorState, key: string, componentData) {
  const currentContent = editorState.getCurrentContent();
  const entityKey = currentContent
    .getBlockMap()
    .get(key)
    .getEntityAt(0);
  currentContent.replaceEntityData(entityKey, componentData);
}

function updateUndoEditorState(editorState: EditorState, newEditorState: EditorState) {
  const newContentState = convertToRaw(newEditorState.getCurrentContent());
  const contentState = convertToRaw(editorState.getCurrentContent());

  const entityToReplace = getEntityToReplace(newContentState, contentState);
  if (entityToReplace) {
    const { key, newData, shouldUndoAgain } = entityToReplace;
    replaceComponentData(newEditorState, key, newData);
    if (shouldUndoAgain) {
      return undo(newEditorState);
    }
  }
  return pushToRedoStack(
    createEditorStateWithoutComposition(newEditorState),
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
  return createEditorStateWithoutComposition(newEditorState);
};
