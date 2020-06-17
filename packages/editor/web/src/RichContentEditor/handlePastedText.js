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

//Fixes spaces deletion when pasting hyperlinks (draft-convert trimming)
const replaceSpansWithOnlySpaces = html =>
  // eslint-disable-next-line no-irregular-whitespace
  html.replace(/(<span> <\/span>)/g, ' ');

const applyPasteOnContentState = (editorState, html, text) => {
  const contentToPaste = html
    ? draftConvertFromHtml(pastedContentConfig)(replaceSpansWithOnlySpaces(html))
    : ContentState.createFromText(text);

  const contentState = clearAtomicBlockEntities(editorState);
  const contentWithPaste = Modifier.replaceWithFragment(
    contentState,
    editorState.getSelection(),
    contentToPaste.getBlockMap()
  );

  return contentWithPaste;
};

export default (text, html, editorState) => {
  const contentWithPaste = applyPasteOnContentState(editorState, html, text);
  const newContentState = clearUnnecessaryInlineStyles(contentWithPaste);

  return EditorState.forceSelection(
    EditorState.push(editorState, newContentState, 'pasted-text'),
    contentWithPaste.getSelectionAfter()
  );
};
