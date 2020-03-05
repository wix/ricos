export const hasLinksInBlock = (block, contentState) => {
  return !!getLinkRangesInBlock(block, contentState);
};

export const getLinkRangesInBlock = (block, contentState) => {
  const ranges = [];
  block.entityRanges.forEach(entityRange => {
    const entityType = contentState.entityMap[entityRange.key]?.type;
    if (entityType === 'LINK' || entityType === 'wix-draft-plugin-external-link') {
      const start = entityRange.offset;
      const end = start + entityRange.length;
      ranges.push([start, end]);
    }
  });
  return ranges;
};
