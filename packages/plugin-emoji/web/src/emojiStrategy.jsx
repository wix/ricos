/* eslint-disable fp/no-loops */
export const emojiEntityStrategy = (contentBlock, callback, contentState) => {
  const EMOJI_TYPE = 'EMOJI_TYPE';
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === EMOJI_TYPE;
  }, callback);
};
