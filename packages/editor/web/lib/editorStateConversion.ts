import { convertFromRaw as fromRaw, convertToRaw as toRaw, EditorState } from '@wix/draft-js';
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

type Pair = {
  key: string;
  title: EditorState;
  content: EditorState;
};

const convertInnerRceToRaw = rawContentState => {
  Object.keys(rawContentState.entityMap).forEach(entityKey => {
    const currentEntity = rawContentState.entityMap[entityKey];
    if (isAccordion(currentEntity)) {
      const { pairs } = currentEntity.data;
      const rawPairs = pairs.map((pair: Pair) => {
        return {
          key: pair.key,
          title: toRaw(pair.title.getCurrentContent()),
          content: toRaw(pair.content.getCurrentContent()),
        };
      });
      currentEntity.data = {
        ...currentEntity.data,
        pairs: rawPairs,
      };
    }
  });
  return rawContentState;
};

const convertInnerRceFromRaw = rawState => {
  Object.keys(rawState.entityMap).forEach(entityKey => {
    const currentEntity = rawState.entityMap[entityKey];
    if (isAccordion(currentEntity)) {
      const { pairs } = currentEntity.data;
      pairs.forEach((pair: Pair) => {
        pair.title = EditorState.createWithContent(convertFromRaw(pair.title));
        pair.content = EditorState.createWithContent(convertFromRaw(pair.content));
      });
    }
  });
  return rawState;
};

const convertToRaw = ContentState =>
  addVersion(__convertToRawWithoutVersion(ContentState), version);

const __convertToRawWithoutVersion = ContentState =>
  fixBlockDataImmutableJS(
    convertInnerRceToRaw(convertAnchorTypeForUnsupportedInOneApp(toRaw(ContentState)))
  );

const convertFromRaw = rawState =>
  addVersion(fromRaw(convertInnerRceFromRaw(rawState)), rawState.VERSION);

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
