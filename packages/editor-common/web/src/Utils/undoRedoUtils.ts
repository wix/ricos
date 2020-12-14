import { EditorState } from '@wix/draft-js';
import { RicosContent } from 'ricos-content';
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

const imagePredicate = (
  type: string,
  currentSrc: Record<string, unknown>,
  newSrc: Record<string, unknown> | undefined
) => type === IMAGE_TYPE && currentSrc && !newSrc;

const videoPredicate = (
  type: string,
  currentTempData: boolean | undefined,
  newTempData: boolean | undefined
) => type === VIDEO_TYPE && !currentTempData && newTempData;

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
  const entitiesToReplace: {
    key: string;
    newData: Record<string, unknown>;
    currentData: Record<string, unknown>;
  }[] = [];
  blocks.forEach(block => {
    const { entityRanges = [], key } = block;
    if (key in replaceableEntitiesMap) {
      const {
        type,
        data,
        data: { src, tempData, error },
      } = entityMap[entityRanges[0]?.key];
      if (!isEqual(data, replaceableEntitiesMap[key])) {
        if (
          imagePredicate(type, src, replaceableEntitiesMap[key].src) ||
          videoPredicate(type, tempData, replaceableEntitiesMap[key].tempData)
        ) {
          entitiesToReplace.push({
            key,
            newData: { ...replaceableEntitiesMap[key], src, error },
            currentData: data,
          });
        } else if (type === FILE_TYPE) {
          const { config } = replaceableEntitiesMap[key];
          entitiesToReplace.push({ key, newData: { ...data, config }, currentData: data });
        } else if (type === GALLERY_TYPE) {
          const items = applyActionForGalleryItems(data.items, replaceableEntitiesMap[key].items);
          entitiesToReplace.push({
            key,
            newData: { ...replaceableEntitiesMap[key], items },
            currentData: data,
          });
        }
      }
    }
  });
  return entitiesToReplace;
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
  const entitiesToReplace = getEntityToReplace(newContentState, contentState);
  if (entitiesToReplace.length > 0) {
    let shouldUndoAgain = true;
    entitiesToReplace.forEach(entityToReplace => {
      replaceComponentData(newEditorState, entityToReplace.key, entityToReplace.newData);
      if (!isEqual(entityToReplace.newData, entityToReplace.currentData)) {
        shouldUndoAgain = false;
      }
    });
    if (shouldUndoAgain) {
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
