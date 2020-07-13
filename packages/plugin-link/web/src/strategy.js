export const linkEntityStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      (contentState.getEntity(entityKey).getType() === 'LINK' ||
        contentState.getEntity(entityKey).getType() === 'ANCHOR')
    );
  }, callback);
};
