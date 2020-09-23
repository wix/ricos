import {
  EditorState,
  Modifier,
  SelectionState,
  ContentState,
  createEntity,
} from 'wix-rich-content-editor-common';
import { convertFromHTML as draftConvertFromHtml } from 'draft-convert';
import { pastedContentConfig, clearUnnecessaryInlineStyles } from './utils/pastedContentUtil';
import { convertFromRaw } from 'draft-js';

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

const FRAGMENT_ATTR = 'data-draftjs-conductor-fragment';

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

const handlePastedTextFromEditor = (html, editorState) => {
  const rawContent = getContent(html);
  const fragment = convertFromRaw(rawContent).getBlockMap();
  const selection = editorState.getSelection();
  let currentContentState = editorState.getCurrentContent();
  Object.entries(rawContent.entityMap).forEach(([, value]) => {
    const oldContentState = currentContentState;
    const { type, data } = value;
    const entityKey = createEntity(editorState, { type, data });
    currentContentState = Modifier.applyEntity(oldContentState, selection, entityKey);
  });

  const content = Modifier.replaceWithFragment(currentContentState, selection, fragment);
  return EditorState.push(editorState, content, 'insert-fragment');
};

const handlePastedTextFromOutsideEditor = (text, html, editorState) => {
  const contentWithPaste = applyPasteOnContentState(editorState, html, text);
  const newContentState = clearUnnecessaryInlineStyles(contentWithPaste);

  return EditorState.forceSelection(
    EditorState.push(editorState, newContentState, 'pasted-text'),
    contentWithPaste.getSelectionAfter()
  );
};

const getContent = html => {
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const fragmentElt = doc.querySelector(`[${FRAGMENT_ATTR}]`);
    if (fragmentElt) {
      const fragmentAttr = fragmentElt.getAttribute(FRAGMENT_ATTR);
      const rawContent = JSON.parse(fragmentAttr);
      return rawContent;
    }
  } catch (error) {
    return false;
  }
  return false;
};

const isCopyFromEditor = html => !!getContent(html);

export default (text, html, editorState, pasteWithoutAtomic) => {
  return isCopyFromEditor(html) && !pasteWithoutAtomic
    ? handlePastedTextFromEditor(html, editorState)
    : handlePastedTextFromOutsideEditor(text, html, editorState);
};
