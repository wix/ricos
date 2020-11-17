import { EditorState, cloneDeepWithoutEditorState } from 'wix-rich-content-editor-common';
import {
  convertFromRaw as fromRaw,
  convertToRaw as toRaw,
  RawDraftEntity,
  RawDraftContentState,
} from '@wix/draft-js';
import { ACCORDION_TYPE, TABLE_TYPE } from 'ricos-content';
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
const isTable = entity => entity.type === TABLE_TYPE;

type Pair = {
  key: string;
  title: EditorState;
  content: EditorState;
};

type RawPair = {
  key: string;
  title: RawDraftContentState;
  content: RawDraftContentState;
};

type Row = Record<string, Columns>;
type Columns = Record<string, Cell>;
type Cell = {
  content: EditorState;
};

const isTextAnchor = entity => entity.type === 'LINK' && !!entity.data.anchor;

const isImageAnchor = entity =>
  entity.type === 'wix-draft-plugin-image' && !!entity.data?.config?.link?.anchor;

const entityMapDataFixer = (rawContentState, entityFixers) => {
  const updatedRaw = cloneDeepWithoutEditorState(rawContentState);
  Object.values(updatedRaw.entityMap).forEach((entity: RawDraftEntity) => {
    entityFixers.forEach(({ predicate, entityFixer }) => {
      if (predicate(entity)) {
        entityFixer(entity);
      }
    });
  });
  return updatedRaw;
};

const entityFixersToRaw = [
  {
    predicate: isImageAnchor,
    entityFixer: (entity: RawDraftEntity) => {
      const { link, ...rest } = entity.data.config;
      entity.data.config = {
        anchor: link.anchor,
        ...rest,
      };
    },
  },
  {
    predicate: isTextAnchor,
    entityFixer: entity => {
      entity.type = 'ANCHOR';
    },
  },
  {
    predicate: isAccordion,
    entityFixer: (entity: RawDraftEntity) => {
      const { pairs } = entity.data;
      entity.data.pairs = pairs.map((pair: Pair) => {
        return {
          key: pair.key,
          title: toRaw(pair.title.getCurrentContent()),
          content: toRaw(pair.content.getCurrentContent()),
        };
      });
    },
  },
  {
    predicate: isTable,
    entityFixer: (entity: RawDraftEntity) => {
      entity.data.config = convertTableConfigToRaw(entity.data.config);
    },
  },
];

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

const entityFixersFromRaw = [
  {
    predicate: isAccordion,
    entityFixer: (entity: RawDraftEntity) => {
      const { pairs } = entity.data;
      entity.data.pairs = pairs.map((pair: RawPair) => {
        return {
          key: pair.key,
          title: EditorState.createWithContent(convertFromRaw(pair.title)),
          content: EditorState.createWithContent(convertFromRaw(pair.content)),
        };
      });
    },
  },
  {
    predicate: isTable,
    entityFixer: (entity: RawDraftEntity) => {
      const { rows } = entity.data.config;
      Object.entries(rows).forEach(([, row]) => {
        Object.entries((row as Row).columns).forEach(([, column]) => {
          column.content = EditorState.createWithContent(convertFromRaw(column.content));
        });
      });
    },
  },
];

const convertToRaw = ContentState =>
  addVersion(
    fixBlockDataImmutableJS(entityMapDataFixer(toRaw(ContentState), entityFixersToRaw)),
    version
  );

const convertFromRaw = rawState =>
  addVersion(fromRaw(entityMapDataFixer(rawState, entityFixersFromRaw)), rawState.VERSION);

const createEmpty = () => addVersion(EditorState.createEmpty(), version);
const createWithContent = contentState =>
  addVersion(EditorState.createWithContent(contentState), contentState.VERSION);

export {
  EditorState,
  createEmpty,
  createWithContent,
  convertToRaw,
  convertFromRaw,
  convertTableConfigToRaw,
};
