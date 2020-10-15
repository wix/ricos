import { convertFromRaw as fromRaw, convertToRaw as toRaw, EditorState } from '@wix/draft-js';
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

const convertToRaw = ContentState =>
  addVersion(__convertToRawWithoutVersion(ContentState), version);

const __convertToRawWithoutVersion = ContentState =>
  fixBlockDataImmutableJS(convertAnchorTypeForUnsupportedInOneApp(toRaw(ContentState)));

const convertFromRaw = rawState => addVersion(fromRaw(rawState), rawState.VERSION);

const createEmpty = () => addVersion(EditorState.createEmpty(), version);
const createWithContent = contentState =>
  addVersion(EditorState.createWithContent(contentState), contentState.VERSION);

export {
  EditorState,
  createEmpty,
  createWithContent,
  convertToRaw,
  __convertToRawWithoutVersion,
  convertFromRaw,
};
