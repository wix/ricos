import { INTERACTIONS } from '../const';
const readMoreMerger = (contentState, { lines, ellipsis, label } = {}) => {
  if (!contentState.blocks || contentState.blocks.length === 0) {
    return contentState;
  }

  const lastBlock = contentState.blocks.slice(-1)[0];
  if (lastBlock.type === 'atomic') {
    return contentState;
  }

  const modifiedBlock = {
    ...lastBlock,
    data: {
      ...lastBlock.data,
      interactions: [
        ...(lastBlock.data.interactions || []),
        {
          type: INTERACTIONS.READ_MORE,
          settings: { lines, ellipsis, label },
        },
      ],
    },
  };
  return {
    ...contentState,
    blocks: [...contentState.blocks.slice(0, contentState.blocks.length - 1), modifiedBlock],
  };
};

export const readMore = (builder, { lines, ellipsis, label } = {}) => {
  builder.contentState = readMoreMerger(builder.contentState, { lines, ellipsis, label });
  return builder;
};
