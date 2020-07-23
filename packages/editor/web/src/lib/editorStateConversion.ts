import {
  convertFromRaw as fromRaw,
  convertToRaw as toRaw,
  EditorState,
} from 'wix-rich-content-editor-common';
import { version } from '../../package.json';

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

const anchorConversion = rowContentState => {
  Object.keys(rowContentState.entityMap).forEach(entityKey => {
    const currentEntity = rowContentState.entityMap[entityKey];
    if (currentEntity.type === 'LINK' && !!currentEntity.data.anchor) {
      currentEntity.type = 'ANCHOR';
    }
    if (
      currentEntity.type === 'wix-draft-plugin-image' &&
      !!currentEntity.data.config.link?.anchor
    ) {
      const { link, ...rest } = currentEntity.data.config;
      currentEntity.data.config = {
        anchor: link.anchor,
        ...rest,
      };
    }
  });
  return rowContentState;
};

const convertToRaw = ContentState =>
  addVersion(fixBlockDataImmutableJS(anchorConversion(toRaw(ContentState))), version);

const convertFromRaw = rawState => addVersion(fromRaw(rawState), rawState.VERSION);

const createEmpty = () => addVersion(EditorState.createEmpty(), version);
const createWithContent = contentState =>
  addVersion(EditorState.createWithContent(contentState), contentState.VERSION);

export { EditorState, createEmpty, createWithContent, convertToRaw, convertFromRaw };
