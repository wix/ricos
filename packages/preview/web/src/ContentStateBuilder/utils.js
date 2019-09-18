import { isArray } from 'lodash';

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

// export const addEntity = ({ contentState, entity, config }) => {};

// export const addPluginData = ({ contentState, data, type, config }) => {};

export const toArray = content => (isArray(content) ? content : [content]);
