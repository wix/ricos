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

const isTable = entity => entity.type === 'table';

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

type Row = Record<string, Columns>;
type Columns = Record<string, Cell>;
type Cell = {
  content: EditorState;
};

const convertTableConfigToRaw = (config, removeBlockKey = false) => {
  const { rows, ...rest } = config;
  const newRows = {};
  Object.entries(rows).forEach(([rowIndex, row]) => {
    newRows[rowIndex] = {};
    Object.entries((row as Row).columns).forEach(([cellIndex, cell]) => {
      const content = toRaw((cell as Cell).content.getCurrentContent());
      if (removeBlockKey) {
        content.blocks.map(block => (block.key = ''));
      }
      newRows[rowIndex].columns = {
        ...newRows[rowIndex].columns,
        [cellIndex]: { ...cell, content },
      };
    });
  });
  return {
    rows: newRows,
    ...rest,
  };
};

const convertInnerRceToRaw = rowContentState => {
  Object.keys(rowContentState.entityMap).forEach(entityKey => {
    const currentEntity = rowContentState.entityMap[entityKey];
    if (isTable(currentEntity)) {
      currentEntity.data = {
        ...currentEntity.data,
        config: convertTableConfigToRaw(currentEntity.data.config),
      };
    }
  });
  return rowContentState;
};

const convertInnerRceFromRaw = rawState => {
  Object.keys(rawState.entityMap).forEach(entityKey => {
    const currentEntity = rawState.entityMap[entityKey];
    if (isTable(currentEntity)) {
      const { rows } = currentEntity.data.config;
      Object.entries(rows).forEach(([, row]) => {
        Object.entries((row as Row).columns).forEach(([, column]) => {
          column.content = EditorState.createWithContent(convertFromRaw(column.content));
        });
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
  convertTableConfigToRaw,
};
