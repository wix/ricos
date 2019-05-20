import { getUrlMatches, insertLinkInPosition } from 'wix-rich-content-common';

export const autoLinkifyStrategy = ({ setEditorState, getEditorState, anchorTarget, relValue }) => (
  contentBlock,
  callback,
  contentState
) => {
  const addLinkAt = (url, start, end) => {
    const newEditorState = insertLinkInPosition(
      getEditorState(),
      contentBlock.getKey(),
      start,
      end,
      {
        url,
        anchorTarget,
        relValue,
      }
    );
    setEditorState(newEditorState);
  };
  const text = contentBlock.get('text');
  getUrlMatches(text)
    .filter(({ text: url, index: start, lastIndex: end }) => {
      const entityKey = contentBlock.getEntityAt(start);
      const entityType = entityKey !== null && contentState.getEntity(entityKey).getType();
      const endsWithDelimiter = /\W/.test(text[end]);
      const longEnough = url.length >= 6;
      return entityType !== 'LINK' && entityType !== 'WAS_LINK' && endsWithDelimiter && longEnough;
    })
    .forEach(({ text: url, index: start, lastIndex: end }) => {
      setTimeout(() => {
        addLinkAt(url, start, end);
      }, 0);
    });
};

export const linkEntityStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
};
