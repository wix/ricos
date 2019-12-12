export const hasLinksInBlock = (block, contentState) => {
  return block.entityRanges.some(entityRange => {
    const entityType = contentState.entityMap[entityRange.key]?.type;
    return entityType === 'LINK' || entityType === 'wix-draft-plugin-external-link';
  });
};
