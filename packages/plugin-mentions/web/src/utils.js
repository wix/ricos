import addMention from 'draft-js-mention-plugin/lib/modifiers/addMention';

export const addMentionToEditorState = (...args) => addMention(...args);

export const getMentionsFromEditorState = editorState => {
  if (!editorState || !editorState.entityMap) {
    return [];
  }

  return Object.values(editorState.entityMap)
    .filter(entity => entity.type === 'mention')
    .map(entity => entity.data.mention);
};
