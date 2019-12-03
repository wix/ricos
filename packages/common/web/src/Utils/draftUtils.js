export const hasLinksInBlock = (block, contentState) => {
  try {
    if (block.entityRanges && block.entityRanges.length) {
      return block.entityRanges.some(entityRange => {
        const entityMap = contentState.get('entityMap');
        const entityKey = entityMap[entityRange.key];
        const entity = contentState.getEntity(entityKey);
        const entityType = entity.type;
        if (entityType === 'LINK' || entityType === 'wix-draft-plugin-external-link') {
          return true;
        }
        return false;
      });
    }
  } catch (e) {
    return false;
  }
};
