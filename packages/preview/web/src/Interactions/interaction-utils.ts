import { RicosContent, RicosContentBlock, RicosEntity } from 'wix-rich-content-common';
import { INTERACTIONS } from '../const';
import ContentStateBuilder from '../ContentStateBuilder/ContentStateBuilder';

interface InteractionDataMerger {
  contentState: RicosContent;
  settings: Record<string, unknown>;
  blockFilter: (block: RicosContentBlock) => unknown;
  type: string;
  schema: string[];
}

const interactionDataMerger = ({
  contentState,
  settings = {},
  blockFilter = () => {},
  type,
  schema = [],
}: InteractionDataMerger): RicosContent => {
  if (!contentState.blocks || contentState.blocks.length === 0) {
    return contentState;
  }

  const lastBlock = contentState.blocks.slice(-1)[0];
  if (blockFilter(lastBlock)) {
    return contentState;
  }

  const invalidSettings = Object.keys(settings).filter(key => !schema.includes(key));

  if (invalidSettings.length > 0) {
    // eslint-disable-next-line
    console.error(`Warning: invalid ${type} interaction settings found`, invalidSettings);
  }

  if (lastBlock.type !== 'atomic') {
    const modifiedBlock = {
      ...lastBlock,
      data: {
        ...lastBlock.data,
        interactions: [
          ...(lastBlock?.data?.interactions || []),
          {
            type,
            settings,
          },
        ],
      },
    };
    return {
      ...contentState,
      blocks: [...contentState.blocks.slice(0, contentState.blocks.length - 1), modifiedBlock],
    };
  } else {
    const lastBlockEntityKey = lastBlock.entityRanges.length > 0 && lastBlock.entityRanges[0].key;
    if (lastBlockEntityKey !== false) {
      const lastBlockEntity =
        lastBlock.entityRanges.length > 0 && contentState.entityMap[lastBlockEntityKey];
      const modifiedEntity = {
        ...lastBlockEntity,
        data: {
          ...(lastBlockEntity && lastBlockEntity.data),
          interactions: [
            ...((lastBlockEntity && lastBlockEntity.data.interactions) || []),
            { type, settings },
          ],
        },
      };
      return {
        ...contentState,
        entityMap: {
          ...contentState.entityMap,
          [lastBlockEntityKey]: modifiedEntity as RicosEntity,
        },
      };
    } else {
      return contentState;
    }
  }
};

export const readMore = (builder: ContentStateBuilder, settings = {}) => {
  builder.contentState = interactionDataMerger({
    contentState: builder.contentState,
    settings,
    blockFilter: block => block.type === 'atomic',
    type: INTERACTIONS.READ_MORE,
    schema: ['label', 'onClick', 'expandMode', 'lines', 'text', 'showToggle'],
  });
  return builder;
};

export const seeFullPost = (builder: ContentStateBuilder, settings = {}) => {
  builder.contentState = interactionDataMerger({
    contentState: builder.contentState,
    settings,
    blockFilter: () => false,
    type: INTERACTIONS.SEE_FULL_CONTENT,
    schema: ['label', 'labelStyles', 'overlayStyles', 'onClick'],
  });
  return builder;
};

export const imageCounter = (builder, settings = {}) => {
  builder.contentState = interactionDataMerger({
    contentState: builder.contentState,
    settings,
    blockFilter: block => block.type !== 'atomic',
    type: INTERACTIONS.IMAGE_COUNTER,
    schema: ['counter', 'formatLabel', 'onClick', 'style'],
  });
  return builder;
};
