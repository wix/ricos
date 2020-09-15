import { PluginData } from './../ContentStateAnalyzer/types';
import { RicosContent, RicosContentBlock } from 'wix-rich-content-common';
import { isArray } from 'lodash';
import { TextBlockWithEntities } from '../ContentStateAnalyzer/types';
import mergeEntityData from './mergeEntityData';

type PartialBlockConfig = Partial<RicosContentBlock>;

interface BlockDetails {
  contentState: RicosContent;
  text: string;
  type: string;
  config: PartialBlockConfig;
  data?: RicosContentBlock['data'];
}

interface PluginDetails {
  contentState: RicosContent;
  data: PluginData['mediaInfo'];
  config: PluginData['config'];
}

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

const createBlock = (
  type: string,
  text: string,
  config: PartialBlockConfig
): RicosContentBlock => ({
  key: createBlockKey(),
  type,
  text,
  ...{ ...DEFAULT_BLOCK_CONFIG, ...(config || {}) },
});

export const addBlock = ({ contentState, text, type, config }: BlockDetails): RicosContent => ({
  ...contentState,
  blocks: [...contentState.blocks, createBlock(type, text, config)],
});

export const addEntity = ({ contentState, data, config }: PluginDetails): RicosContent => {
  const mergedEntity = mergeEntityData(data, config);
  return {
    ...contentState,
    entityMap: {
      ...contentState.entityMap,
      [Object.keys(contentState.entityMap).length]: mergedEntity,
    },
  };
};

export const addPlugin = ({ contentState, data, config }: PluginDetails): RicosContent => {
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

export const toArray = (
  content: TextBlockWithEntities | TextBlockWithEntities[]
): TextBlockWithEntities[] => (isArray(content) ? content : [content]);

interface BlockMerger extends TextBlockWithEntities {
  contentState: RicosContent;
}

export const mergeBlockWithEntities = ({
  contentState,
  block,
  entities,
}: BlockMerger): RicosContent => ({
  ...contentState,
  blocks: [...contentState.blocks, block],
  entityMap: { ...contentState.entityMap, ...entities },
});
