import { EditorState } from 'wix-rich-content-editor-common';
import { convertFromRaw as fromRaw, convertToRaw as toRaw, RawDraftEntity } from '@wix/draft-js';
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

const entityMapDataFixer = (rowContentState, entityFixers) => {
  Object.values(rowContentState.entityMap).forEach((entity: RawDraftEntity) => {
    entityFixers.forEach(({ predicate, entityFixer }) => {
      if (predicate(entity)) {
        entity.data = cloneDeepWithoutEditorState(entity.data);
        entityFixer(entity);
      }
    });
  });
  return rowContentState;
};

const entityFixersToRaw = [
  {
    predicate: isImageAnchor,
    entityFixer: entity => {
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
    entityFixer: entity => {
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

const isEditorState = value => value?.getCurrentContent && value;

const cloneDeepWithoutEditorState = obj => cloneDeepWith(obj, isEditorState);

type Pair = {
  key: string;
  title: EditorState;
  content: EditorState;
};

const getCurrentContent = editorState => {
  const blocks = Object.values(editorState._immutable.currentContent.blockMap);
  const entityMap = editorState._immutable.currentContent.entityMap;
  return {
    blocks,
    entityMap,
  };
};

const convertInnerRceFromRaw = rawState => {
  const updatedRaw = cloneDeepWithoutEditorState(rawState);
  Object.keys(updatedRaw.entityMap).forEach(entityKey => {
    const currentEntity = updatedRaw.entityMap[entityKey];
    if (isAccordion(currentEntity)) {
      const { pairs } = currentEntity.data;
      const parsedPairs = pairs.map(pair => {
        const title = EditorState.createWithContent(
          convertFromRaw(pair.title._immutable ? getCurrentContent(pair.title) : pair.title)
        );
        const content = EditorState.createWithContent(
          convertFromRaw(pair.content._immutable ? getCurrentContent(pair.content) : pair.content)
        );

        return {
          key: pair.key,
          title,
          content,
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
    fixBlockDataImmutableJS(entityMapDataFixer(toRaw(ContentState), entityFixersToRaw)),
    version
  );

const convertFromRaw = rawState =>
  addVersion(fromRaw(convertInnerRceFromRaw(rawState)), rawState.VERSION);

const createEmpty = () => addVersion(EditorState.createEmpty(), version);
const createWithContent = contentState =>
  addVersion(EditorState.createWithContent(contentState), contentState.VERSION);

export { EditorState, createEmpty, createWithContent, convertToRaw, convertFromRaw };
