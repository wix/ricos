export const truncateContentState = (contentState, index) => {
  const newContentState = {
    ...contentState,
    blocks: [...contentState.blocks.slice(0, index)],
  };
  return newContentState;
};
