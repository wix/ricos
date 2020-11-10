import { EditorState } from 'wix-rich-content-editor-common';
import { convertFromRaw as fromRaw, convertToRaw as toRaw } from '@wix/draft-js';
import { cloneDeepWith } from 'lodash';
import { ACCORDION_TYPE } from 'ricos-content';
import { version } from '../package.json';

const addVersion = (obj, version) => {
  obj.VERSION = version;
  return obj;
};

const fixBlockDataImmutableJS = contentState => {
  contentState.blocks.forEach(block =>
    Object.keys(block.data).forEach(key => {
      const value = block.data[key];
      if (value.toObject) {
        block.data[key] = value.toObject();
      }
    })
  );
  return contentState;
};

const isAccordion = entity => entity.type === ACCORDION_TYPE;

const isTextAnchor = entity => entity.type === 'LINK' && !!entity.data.anchor;
const isImageAnchor = entity =>
  entity.type === 'wix-draft-plugin-image' && !!entity.data?.config?.link?.anchor;

const convertAnchorTypeForUnsupportedInOneApp = rowContentState => {
  Object.keys(rowContentState.entityMap).forEach(entityKey => {
    const currentEntity = rowContentState.entityMap[entityKey];
    if (isTextAnchor(currentEntity)) {
      currentEntity.type = 'ANCHOR';
    } else if (isImageAnchor(currentEntity)) {
      const { link, ...rest } = currentEntity.data.config;
      currentEntity.data = {
        ...currentEntity.data,
        config: {
          anchor: link.anchor,
          ...rest,
        },
      };
    }
  });
  return rowContentState;
};

const isEditorState = value => value?.getCurrentContent && value;

const cloneDeepWithoutEditorState = obj => cloneDeepWith(obj, isEditorState);

type Pair = {
  key: string;
  title: EditorState;
  content: EditorState;
};

const convertInnerRceToRaw = rawContentState => {
  const updatedRaw = cloneDeepWithoutEditorState(rawContentState);
  Object.keys(updatedRaw.entityMap).forEach(entityKey => {
    const currentEntity = updatedRaw.entityMap[entityKey];
    if (isAccordion(currentEntity)) {
      const { pairs } = currentEntity.data;
      const rawPairs = pairs.map((pair: Pair) => {
        return {
          key: pair.key,
          title: pair.title ? toRaw(pair.title.getCurrentContent()) : EditorState.createEmpty(),
          content: pair.content
            ? toRaw(pair.content.getCurrentContent())
            : EditorState.createEmpty(),
        };
      });
      currentEntity.data = {
        ...currentEntity.data,
        pairs: rawPairs,
      };
    }
  });
  return updatedRaw;
};

const convertInnerRceFromRaw = rawState => {
  const updatedRaw = cloneDeepWithoutEditorState(rawState);
  Object.keys(updatedRaw.entityMap).forEach(entityKey => {
    const currentEntity = updatedRaw.entityMap[entityKey];
    if (isAccordion(currentEntity)) {
      const { pairs } = currentEntity.data;
      const parsedPairs = pairs.map((pair: Pair) => {
        return {
          key: pair.key,
          title: EditorState.createWithContent(convertFromRaw(pair.title)),
          content: EditorState.createWithContent(convertFromRaw(pair.content)),
        };
      });
      currentEntity.data = {
        ...currentEntity.data,
        pairs: parsedPairs,
      };
    }
  });
  return updatedRaw;
};

const convertToRaw = ContentState =>
  addVersion(
    fixBlockDataImmutableJS(
      convertInnerRceToRaw(convertAnchorTypeForUnsupportedInOneApp(toRaw(ContentState)))
    ),
    version
  );

const convertFromRaw = rawState =>
  addVersion(fromRaw(convertInnerRceFromRaw(rawState)), rawState.VERSION);

const createEmpty = () => addVersion(EditorState.createEmpty(), version);
const createWithContent = contentState =>
  addVersion(EditorState.createWithContent(contentState), contentState.VERSION);

export { EditorState, createEmpty, createWithContent, convertToRaw, convertFromRaw };
