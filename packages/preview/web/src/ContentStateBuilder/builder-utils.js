import { isArray } from 'lodash';
import mergeEntityData from './mergeEntityData';

const DEFAULT_BLOCK_CONFIG = {
  data: {},
  inlineStyleRanges: [],
  entityRanges: [],
  depth: 0,
};

const createBlockKey = () =>
  Math.random()
    .toString(36)
    .substr(2, 5);

const createBlock = (type, text, config = {}) => ({
  key: createBlockKey(),
  type,
  text,
  ...{ ...DEFAULT_BLOCK_CONFIG, ...config },
});

export const addBlock = ({ contentState, text, type, config }) => ({
  ...contentState,
  blocks: [...contentState.blocks, createBlock(type, text, config)],
});

export const addEntity = ({ contentState, data, config }) => {
  const mergedEntity = mergeEntityData(data, config);
  return {
    ...contentState,
    entityMap: {
      ...contentState.entityMap,
      [Object.keys(contentState.entityMap).length]: mergedEntity,
    },
  };
};

export const addPlugin = ({ contentState, data, config }) => {
  const contentStateWithBlock = addBlock({
    contentState,
    text: ' ',
    type: 'atomic',
    config: {
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: Object.keys(contentState.entityMap).length,
        },
      ],
    },
  });

  return addEntity({
    contentState: contentStateWithBlock,
    data,
    config,
  });
};

export const toArray = content => (isArray(content) ? content : [content]);

export const mergeBlockWithEntities = ({ contentState, block, entities }) => ({
  ...contentState,
  blocks: [...contentState.blocks, block],
  entityMap: { ...contentState.entityMap, ...entities },
});
