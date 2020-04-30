export const truncateContentState = (contentState, index) => {
  if (index < 0 || index > contentState.blocks.length) {
    return contentState;
  }
  const newEntityMap = {};
  const newBlocks = [...contentState.blocks.slice(0, index)];
  newBlocks.forEach(block => {
    if (block.entityRanges?.length > 0) {
      const key = block.entityRanges[0].key;
      newEntityMap[key] = contentState.entityMap[key];
    }
  });
  return { ...contentState, blocks: newBlocks, entityMap: newEntityMap };
};
