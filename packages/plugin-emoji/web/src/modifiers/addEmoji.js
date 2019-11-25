//Idea got from https://github.com/draft-js-plugins/draft-js-plugins/tree/master/draft-js-emoji-plugin/
import { Modifier, EditorState } from 'draft-js';

const addEmoji = (editorState, emoji) => {
  const contentState = editorState.getCurrentContent();
  const currentSelectionState = editorState.getSelection();

  let emojiAddedContent;
  let emojiEndPos = 0;
  let blockSize = 0;

  // in case text is selected it is removed and then the emoji is added
  const afterRemovalContentState = Modifier.removeRange(
    contentState,
    currentSelectionState,
    'backward'
  );

  // deciding on the position to insert emoji
  const targetSelection = afterRemovalContentState.getSelectionAfter();

  emojiAddedContent = Modifier.insertText(afterRemovalContentState, targetSelection, emoji, null);

  emojiEndPos = targetSelection.getAnchorOffset();
  const blockKey = targetSelection.getAnchorKey();
  blockSize = contentState.getBlockForKey(blockKey).getLength();

  // add space after insert emoji
  if (emojiEndPos === blockSize) {
    emojiAddedContent = Modifier.insertText(
      emojiAddedContent,
      emojiAddedContent.getSelectionAfter(),
      ' '
    );
  }

  const newEditorState = EditorState.push(editorState, emojiAddedContent, 'insert-emoji');
  return EditorState.forceSelection(newEditorState, emojiAddedContent.getSelectionAfter());
};

export default addEmoji;
