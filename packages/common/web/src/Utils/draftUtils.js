export const hasLinksInBlock = (block, contentState) => {
  try {
    if (block.entityRanges && block.entityRanges.length) {
      return block.entityRanges.some(entityRange => {
        const entityType = contentState?.entityMap?.[entityRange.key]?.type;
        return entityType === 'LINK' || entityType === 'wix-draft-plugin-external-link';
      });
    }
  } catch (e) {
    return false;
  }
};
