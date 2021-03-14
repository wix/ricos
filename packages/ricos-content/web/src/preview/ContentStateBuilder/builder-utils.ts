import { DraftContent, RicosContentBlock, RicosEntity } from '../../types/contentTypes';
import { isArray } from 'lodash';
import { TextBlockWithEntities } from '../ContentStateAnalyzer/types';
import mergeEntityData from './mergeEntityData';

type PartialBlockConfig = Partial<RicosContentBlock>;

interface BlockDetails {
  contentState: DraftContent;
  text: string;
  type: string;
  config: PartialBlockConfig;
  data?: RicosContentBlock['data'];
}

interface PluginDetails {
  contentState: DraftContent;
  data: Record<string, unknown>;
  config: RicosEntity;
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

export const addBlock = ({ contentState, text, type, config }: BlockDetails): DraftContent => ({
  ...contentState,
  blocks: [...contentState.blocks, createBlock(type, text, config)],
});

export const addEntity = ({ contentState, data, config }: PluginDetails): DraftContent => {
  const mergedEntity = mergeEntityData(data, config);
  return {
    ...contentState,
    entityMap: {
      ...contentState.entityMap,
      [Object.keys(contentState.entityMap).length]: mergedEntity,
    },
  };
};

export const addPlugin = ({ contentState, data, config }: PluginDetails): DraftContent => {
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
  contentState: DraftContent;
}

export const mergeBlockWithEntities = ({
  contentState,
  block,
  entities,
}: BlockMerger): DraftContent => ({
  ...contentState,
  blocks: [...contentState.blocks, block],
  entityMap: { ...contentState.entityMap, ...entities },
});
