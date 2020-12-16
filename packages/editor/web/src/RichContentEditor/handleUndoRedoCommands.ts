import { EditorState } from '@wix/draft-js';
import { RicosContent } from 'ricos-content';
import { convertToRaw } from '../../lib/editorStateConversion';
import { isEqual } from 'lodash';

const IMAGE_TYPE = 'wix-draft-plugin-image';
const VIDEO_TYPE = 'wix-draft-plugin-video';
const FILE_TYPE = 'wix-draft-plugin-file-upload';
const GALLERY_TYPE = 'wix-draft-plugin-gallery';
const ACCORDION_TYPE = 'wix-rich-content-plugin-accordion';
const TABLE_TYPE = 'wix-rich-content-plugin-table';
const types = [GALLERY_TYPE, FILE_TYPE, IMAGE_TYPE, VIDEO_TYPE, ACCORDION_TYPE, TABLE_TYPE];

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

function getEntityToReplace(newContentState: RicosContent, contentState: RicosContent) {
  const replaceableEntitiesMap = createReplaceableEntitiesKeyMap(newContentState);
  const { blocks, entityMap } = contentState;
  let entityToReplace;
  blocks.some(block => {
    const { entityRanges = [], key } = block;
    if (key in replaceableEntitiesMap) {
      const currentEntity = entityMap[entityRanges[0]?.key];
      // If the entity doesn't exist it means it was undone back.
      if (!currentEntity) {
        return true;
      }
      const {
        type,
        data,
        data: { src, tempData, error },
      } = currentEntity;
      if (!isEqual(data, replaceableEntitiesMap[key])) {
        switch (type) {
          case IMAGE_TYPE:
            if (src && !replaceableEntitiesMap[key].src) {
              entityToReplace = {
                key,
                newData: { ...replaceableEntitiesMap[key], src, error },
                currentData: data,
              };
            }
            return true;
          case VIDEO_TYPE:
            if (!tempData && replaceableEntitiesMap[key].tempData) {
              entityToReplace = {
                key,
                newData: { ...replaceableEntitiesMap[key], src, error },
                currentData: data,
              };
            }
            return true;
          case FILE_TYPE:
            // eslint-disable-next-line no-case-declarations
            const { config } = replaceableEntitiesMap[key];
            entityToReplace = { key, newData: { ...data, config }, currentData: data };
            return true;
          case GALLERY_TYPE:
            // eslint-disable-next-line no-case-declarations
            const items = applyActionForGalleryItems(data.items, replaceableEntitiesMap[key].items);
            entityToReplace = {
              key,
              newData: { ...replaceableEntitiesMap[key], items },
              currentData: data,
            };
            return true;
          default:
            entityToReplace = {
              key,
              keepContent: true,
            };
            return true;
        }
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
  editorState: EditorState,
  newEditorState: EditorState,
  newContentState: RicosContent,
  contentState: RicosContent
) {
  const entityToReplace = getEntityToReplace(newContentState, contentState);
  if (entityToReplace) {
    const { key, newData, currentData, keepContent } = entityToReplace;
    if (keepContent) {
      return editorState;
    }
    replaceComponentData(newEditorState, key, newData);
    if (!isEqual(newData, currentData)) {
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
  return updateEditorState(editorState, newEditorState, newContentState, contentState);
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
