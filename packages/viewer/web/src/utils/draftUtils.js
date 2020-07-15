export const getBlockIndex = (contentState, blockKey) =>
  contentState.blocks.findIndex(block => block.key === blockKey);
