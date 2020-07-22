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

const addAnchorType = rowContentState => {
  Object.keys(rowContentState.entityMap).forEach(entityKey => {
    if (
      rowContentState.entityMap[entityKey].type === 'LINK' &&
      !!rowContentState.entityMap[entityKey].data.anchor
    ) {
      rowContentState.entityMap[entityKey].type = 'ANCHOR';
    } else if (
      rowContentState.entityMap[entityKey].type === 'wix-draft-plugin-image' &&
      !!rowContentState.entityMap[entityKey].data.config.link?.anchor
    ) {
      rowContentState.entityMap[entityKey].data.config.anchor =
        rowContentState.entityMap[entityKey].data.config.link.anchor;
      rowContentState.entityMap[entityKey].data.config.link = null;
    }
  });
  return rowContentState;
};

const convertToRaw = ContentState =>
  addVersion(fixBlockDataImmutableJS(addAnchorType(toRaw(ContentState))), version);

const convertFromRaw = rawState => addVersion(fromRaw(rawState), rawState.VERSION);

const createEmpty = () => addVersion(EditorState.createEmpty(), version);
const createWithContent = contentState =>
  addVersion(EditorState.createWithContent(contentState), contentState.VERSION);

export { EditorState, createEmpty, createWithContent, convertToRaw, convertFromRaw };
