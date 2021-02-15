import { MentionData } from 'wix-rich-content-common';
import { EditorState, Modifier } from '@wix/draft-js';

export const triggerMention = editorState => {
  // If the mention is being inserted after a character, a space is appended right after for
  // a smooth writing experience.
  const currentSelectionState = editorState.getSelection();
  const blockKey = currentSelectionState.getAnchorKey();
  const offset = currentSelectionState.getAnchorOffset();
  const block = editorState.getCurrentContent().getBlockForKey(blockKey);
  const toAddSpace = offset > 0 && block.getText().charAt(offset - 1) !== ' ';
  const text = `${toAddSpace ? ' ' : ''}@`;
  const mentionContent = Modifier.insertText(
    editorState.getCurrentContent(),
    currentSelectionState,
    text
  );
  const newEditorState = EditorState.push(editorState, mentionContent, 'insert-characters');
  return EditorState.forceSelection(newEditorState, mentionContent.getSelectionAfter());
};

export const insertMention = (editorState: EditorState, mentionData: MentionData) => {
  const { mention, triggerMention } = mentionData;
  const contentStateWithEntity = editorState
    .getCurrentContent()
    .createEntity('mention', 'IMMUTABLE', {
      mention,
    });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const currentSelectionState = editorState.getSelection();
  const { begin, end } = getSearchText(editorState, currentSelectionState, triggerMention);

  // get selection of the @mention search text
  const mentionTextSelection = currentSelectionState.merge({
    anchorOffset: begin,
    focusOffset: end,
  });

  let mentionReplacedContent = Modifier.replaceText(
    editorState.getCurrentContent(),
    mentionTextSelection,
    `@${mention.name}`,
    undefined, // no inline style needed
    entityKey
  );

  // If the mention is inserted at the end, a space is appended right after for
  // a smooth writing experience.
  const blockKey = mentionTextSelection.getAnchorKey();
  const blockSize = editorState
    .getCurrentContent()
    .getBlockForKey(blockKey)
    .getLength();
  if (blockSize === end) {
    mentionReplacedContent = Modifier.insertText(
      mentionReplacedContent,
      mentionReplacedContent.getSelectionAfter(),
      ' '
    );
  }

  const newEditorState = EditorState.push(editorState, mentionReplacedContent, 'change-block-data');

  return EditorState.forceSelection(newEditorState, mentionReplacedContent.getSelectionAfter());
};

const getSearchText = (editorState, selection, trigger) => {
  const anchorKey = selection.getAnchorKey();
  const anchorOffset = selection.getAnchorOffset();
  const currentContent = editorState.getCurrentContent();
  const currentBlock = currentContent.getBlockForKey(anchorKey);
  const blockText = currentBlock.getText();
  return getSearchTextAt(blockText, anchorOffset, trigger);
};

const getSearchTextAt = (blockText, position, trigger) => {
  const str = blockText.substr(0, position);
  const begin = trigger.length === 0 ? 0 : str.lastIndexOf(trigger);
  const matchingString = trigger.length === 0 ? str : str.slice(begin + trigger.length);
  const end = str.length;

  return {
    begin,
    end,
    matchingString,
  };
};
