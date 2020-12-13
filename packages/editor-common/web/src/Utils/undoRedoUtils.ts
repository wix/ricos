import { EditorState } from '@wix/draft-js';
import { convertToRaw } from 'wix-rich-content-editor/libs/editorStateConversion';
import { isEqual } from 'lodash';

const IMAGE_TYPE = 'wix-draft-plugin-image';
const VIDEO_TYPE = 'wix-draft-plugin-video';
const FILE_TYPE = 'wix-draft-plugin-file-upload';
const GALLERY_TYPE = 'wix-draft-plugin-gallery';
const types = [GALLERY_TYPE, FILE_TYPE, IMAGE_TYPE, VIDEO_TYPE];

function createEditorStateWithoutComposition(editorState: EditorState) {
  if (editorState.isInCompositionMode()) {
    return EditorState.set(editorState, {
      inCompositionMode: false,
    });
  }
  return editorState;
}

const imagePredicate = (type: string, src: Record<string, unknown>, entity) =>
  type === IMAGE_TYPE && src && !entity.src;

const videoPredicate = (type: string, tempData: boolean | undefined, entity) =>
  type === VIDEO_TYPE && !tempData && entity.tempData;

function applyActionForGalleryItems(currentItems, newItems) {
  const currentItemMap = {};
  currentItems.forEach(
    item => (currentItemMap[item.itemId] = { itemId: item.itemId, url: item.url })
  );
  return newItems.map(item => {
    const { itemId } = item;
    if (itemId in currentItemMap) {
      return { ...item, ...currentItemMap[itemId] };
    }
    return item;
  });
}

function createReplaceableEntitiesKeyMap(contentState) {
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

function getEntityToReplace(newContentState, contentState) {
  const replaceableEntitiesMap = createReplaceableEntitiesKeyMap(newContentState);
  const { blocks, entityMap } = contentState;
  let entityToReplace;
  blocks.some(block => {
    const { entityRanges = [], key } = block;
    if (key in replaceableEntitiesMap) {
      const {
        type,
        data,
        data: { src, tempData, error },
      } = entityMap[entityRanges[0]?.key];
      if (!isEqual(data, replaceableEntitiesMap[key])) {
        if (
          imagePredicate(type, src, replaceableEntitiesMap[key]) ||
          videoPredicate(type, tempData, replaceableEntitiesMap[key])
        ) {
          entityToReplace = {
            key,
            newData: { ...replaceableEntitiesMap[key], src, error },
            currentData: data,
          };
          return true;
        } else if (type === FILE_TYPE) {
          const { config } = replaceableEntitiesMap[key];
          entityToReplace = { key, newData: { ...data, config }, currentData: data };
          return true;
        } else if (type === GALLERY_TYPE) {
          const items = applyActionForGalleryItems(data.items, replaceableEntitiesMap[key].items);
          entityToReplace = {
            key,
            newData: { ...replaceableEntitiesMap[key], items },
            currentData: data,
          };
          return true;
        }
      }
    }
    return false;
  });
  return entityToReplace;
}

function replaceEntity(editorState: EditorState, key: string, data) {
  const currentContent = editorState.getCurrentContent();
  const entityKey = currentContent
    .getBlockMap()
    .get(key)
    .getEntityAt(0);
  currentContent.replaceEntityData(entityKey, data);
}

function updateEditorState(newEditorState: EditorState, newContentState, contentState) {
  const entityToReplace = getEntityToReplace(newContentState, contentState);
  if (entityToReplace) {
    replaceEntity(newEditorState, entityToReplace.key, entityToReplace.newData);
    if (isEqual(entityToReplace.newData, entityToReplace.currentData)) {
      return undo(newEditorState);
    }
  }
  return createEditorStateWithoutComposition(newEditorState);
}

export const undo = (editorState: EditorState) => {
  const newEditorState = EditorState.undo(editorState);
  const newContentState = convertToRaw(newEditorState.getCurrentContent());
  const contentState = convertToRaw(editorState.getCurrentContent());

  if (isEqual(newContentState, contentState)) {
    return undo(newEditorState);
  }
  return updateEditorState(newEditorState, newContentState, contentState);
};

export const redo = (editorState: EditorState) => {
  const newEditorState = EditorState.redo(editorState);
  const newContentState = convertToRaw(newEditorState.getCurrentContent());
  const contentState = convertToRaw(editorState.getCurrentContent());

  if (isEqual(newContentState, contentState)) {
    return redo(newEditorState);
  }
  return createEditorStateWithoutComposition(newEditorState);
};
