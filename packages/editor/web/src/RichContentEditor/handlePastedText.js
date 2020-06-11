import {
  EditorState,
  Modifier,
  SelectionState,
  ContentState,
} from 'wix-rich-content-editor-common';
import { convertFromHTML as draftConvertFromHtml } from 'draft-convert';
import { pastedContentConfig, clearUnnecessaryInlineStyles } from './utils/pastedContentUtil';

const clearAtomicBlockEntities = editorState => {
  let contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const blockKey = selectionState.getStartKey();
  const block = contentState.getBlockForKey(blockKey);

  if (block.getType() === 'atomic') {
    const blockSelection = SelectionState.createEmpty(blockKey);
    contentState = Modifier.removeRange(contentState, blockSelection, 'backward');
    contentState = Modifier.setBlockType(contentState, blockSelection, 'unstyled');
  }
  return contentState;
};

const handlePasteOnContentState = (editorState, html, text) => {
  let pastedContentState;

  if (html) {
    pastedContentState = draftConvertFromHtml(pastedContentConfig)(html);
  } else {
    pastedContentState = ContentState.createFromText(text);
  }

  const contentState = clearAtomicBlockEntities(editorState);
  const changedContentState = Modifier.replaceWithFragment(
    contentState,
    editorState.getSelection(),
    pastedContentState.getBlockMap()
  );

  return changedContentState;
};

export default (text, html, editorState) => {
  const pastedContentState = handlePasteOnContentState(editorState, html, text);
  const newContentState = clearUnnecessaryInlineStyles(pastedContentState);

  return EditorState.forceSelection(
    EditorState.push(editorState, newContentState, 'pasted-text'),
    pastedContentState.getSelectionAfter()
  );
};
