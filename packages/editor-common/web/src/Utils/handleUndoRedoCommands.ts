import { EditorState, convertToRaw } from '@wix/draft-js';
import { RicosContent } from 'ricos-content';
import { isEqual } from 'lodash';

const IMAGE_TYPE = 'wix-draft-plugin-image';
const VIDEO_TYPE = 'wix-draft-plugin-video';
const FILE_TYPE = 'wix-draft-plugin-file-upload';
const GALLERY_TYPE = 'wix-draft-plugin-gallery';
const typesToIgnoreChanges = ['wix-rich-content-plugin-accordion', 'wix-rich-content-plugin-table'];
const types = [GALLERY_TYPE, FILE_TYPE, IMAGE_TYPE, VIDEO_TYPE, ...typesToIgnoreChanges];

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

function shouldReplaceImageData(type, currentData, newData) {
  return type === IMAGE_TYPE && currentData.src && !newData.src;
}

function shouldReplaceVideoData(type, currentData, newData) {
  return (
    type === VIDEO_TYPE &&
    ((!currentData.tempData && newData.tempData) ||
      (currentData.metadata && !newData.metadata) ||
      (currentData.src && !newData.src))
  );
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
      const newData = replaceableEntitiesMap[key];

      if (!isEqual(currentData, newData)) {
        entityToReplace = { key, currentData };
        if (shouldReplaceImageData(type, currentData, newData)) {
          const { src, error } = currentData;
          entityToReplace.newData = { ...newData, src, error };
        } else if (shouldReplaceVideoData(type, currentData, newData) || type === FILE_TYPE) {
          const { config } = newData;
          entityToReplace.newData = { ...currentData, config };
        } else if (type === GALLERY_TYPE) {
          const items = applyActionForGalleryItems(currentData.items, newData.items);
          entityToReplace.newData = { ...newData, items };
        } else {
          entityToReplace.newData = { ...currentData };
        }
        return true;
      }
    }
    return false;
  });
  return entityToReplace;
}

function replaceComponentData(editorState: EditorState, key: string, componentData) {
  const currentContent = editorState.getCurrentContent();
  const entityKey = currentContent
    .getBlockMap()
    .get(key)
    .getEntityAt(0);
  currentContent.replaceEntityData(entityKey, componentData);
}

function updateEditorState(
  newEditorState: EditorState,
  newContentState: RicosContent,
  contentState: RicosContent
) {
  const entityToReplace = getEntityToReplace(newContentState, contentState);
  if (entityToReplace) {
    const { key, newData, currentData } = entityToReplace;
    replaceComponentData(newEditorState, key, newData);
    if (isEqual(newData, currentData)) {
      return undo(newEditorState);
    }
  }
  return createEditorStateWithoutComposition(newEditorState);
}

export const undo = (editorState: EditorState) => {
  if (editorState.getUndoStack().isEmpty()) {
    return editorState;
  }

  const newEditorState = EditorState.undo(editorState);
  const newContentState = convertToRaw(newEditorState.getCurrentContent());
  const contentState = convertToRaw(editorState.getCurrentContent());

  if (isEqual(newContentState, contentState)) {
    return undo(newEditorState);
  }
  return updateEditorState(newEditorState, newContentState, contentState);
};

export const redo = (editorState: EditorState) => {
  if (editorState.getRedoStack().isEmpty()) {
    return editorState;
  }

  const newEditorState = EditorState.redo(editorState);
  const newContentState = convertToRaw(newEditorState.getCurrentContent());
  const contentState = convertToRaw(editorState.getCurrentContent());

  if (isEqual(newContentState, contentState)) {
    return redo(newEditorState);
  }
  return createEditorStateWithoutComposition(newEditorState);
};
