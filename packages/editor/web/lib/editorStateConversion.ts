import { EditorState } from 'wix-rich-content-editor-common';
import {
  convertFromRaw as fromRaw,
  convertToRaw as toRaw,
  RawDraftEntity,
  RawDraftContentState,
} from '@wix/draft-js';
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

const isTextAnchor = entity => entity.type === 'LINK' && !!entity.data.anchor;

const isImageAnchor = entity =>
  entity.type === 'wix-draft-plugin-image' && !!entity.data?.config?.link?.anchor;

const entityMapDataFixer = (rawContentState, entityFixers) => {
  Object.values(rawContentState.entityMap).forEach((entity: RawDraftEntity) => {
    entityFixers.forEach(({ predicate, entityFixer }) => {
      if (predicate(entity)) {
        entity.data = cloneDeepWithoutEditorState(entity.data);
        entityFixer(entity);
      }
    });
  });
  return rawContentState;
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
];

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
];

const isEditorState = value => value?.getCurrentContent && value;

const cloneDeepWithoutEditorState = obj => cloneDeepWith(obj, isEditorState);

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

export { EditorState, createEmpty, createWithContent, convertToRaw, convertFromRaw };
