import { List as list } from 'immutable';
import { EditorState, ContentState, ContentBlock, genKey } from 'draft-js';

const addEmojiBlock = (editorState, emoji) => {
  const newBlock = new ContentBlock({
    key: genKey(),
    type: 'unstyled',
    text: emoji,
    characterList: list(),
  });

  const contentState = editorState.getCurrentContent();
  const newBlockMap = contentState.getBlockMap().set(newBlock.key, newBlock);

  return EditorState.push(
    editorState,
    ContentState.createFromBlockArray(newBlockMap.toArray())
      .set('selectionBefore', contentState.getSelectionBefore())
      .set('selectionAfter', contentState.getSelectionAfter())
  );
};
export default addEmojiBlock;
