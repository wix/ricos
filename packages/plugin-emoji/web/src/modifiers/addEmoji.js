//Idea got from https://github.com/draft-js-plugins/draft-js-plugins/tree/master/draft-js-emoji-plugin/

import { createEntity, Modifier, EditorState } from 'wix-rich-content-plugin-commons';

const addEmoji = (editorState, emoji) => {
  const contentState = editorState.getCurrentContent();
  const currentSelectionState = editorState.getSelection();
  const emojiData = {
    type: 'EMOJI_TYPE',
    mutability: 'IMMUTABLE',
    data: { emojiUnicode: emoji },
  };
  const emojiEntityKey = createEntity(editorState, emojiData);

  const emojiAddedContent = Modifier.replaceText(
    contentState,
    currentSelectionState,
    emoji,
    null,
    emojiEntityKey
  );

  const newEditorState = EditorState.push(editorState, emojiAddedContent, 'insert-emoji');
  return EditorState.forceSelection(newEditorState, emojiAddedContent.getSelectionAfter());
};

export default addEmoji;
