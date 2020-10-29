import {
  EditorState,
  Modifier,
  SelectionState,
  ContentState,
  createEntity,
} from 'wix-rich-content-editor-common';
import { convertFromHTML as draftConvertFromHtml } from 'draft-convert';
import { pastedContentConfig, clearUnnecessaryInlineStyles } from './utils/pastedContentUtil';
import normalizeHTML from './utils/normalizeHTML';
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

//Fix replaceWithFragment when fragment size == 1, https://github.com/facebook/draft-js/issues/1511
const replaceWithFragment = (editorState, contentState, contentToPaste) => {
  let contentWithPaste = Modifier.replaceWithFragment(
    contentState,
    editorState.getSelection(),
    contentToPaste.getBlockMap()
  );

  const shouldOverrideBlockType = blockType => blockType === 'unstyled' || blockType === 'atomic';

  const startBlockKey = editorState.getSelection().getStartKey();
  const startBlockType = contentState
    .getBlockMap()
    .get(startBlockKey)
    .getType();

  const fragmentSize = contentToPaste.getBlocksAsArray().length;
  if (fragmentSize === 1 && shouldOverrideBlockType(startBlockType)) {
    const pastedBlockType = contentToPaste.getBlocksAsArray()[0].getType();
    contentWithPaste = Modifier.setBlockType(
      contentWithPaste,
      contentWithPaste.getSelectionAfter(),
      pastedBlockType
    );
  }
  return contentWithPaste;
};

const applyPasteOnContentState = (editorState, html, text) => {
  const contentToPaste = html
    ? draftConvertFromHtml(pastedContentConfig)(html)
    : ContentState.createFromText(text);

  const contentState = clearAtomicBlockEntities(editorState);
  const contentWithPaste = replaceWithFragment(editorState, contentState, contentToPaste);

  return contentWithPaste;
};

const handlePastedTextFromEditor = (html, editorState) => {
  const rawContent = getContent(html);
  const fragment = convertFromRaw(rawContent);
  const selection = editorState.getSelection();
  let currentContentState = editorState.getCurrentContent();
  Object.entries(rawContent.entityMap).forEach(([, value]) => {
    const oldContentState = currentContentState;
    const { type, data } = value;
    const entityKey = createEntity(editorState, { type, data });
    currentContentState = Modifier.applyEntity(oldContentState, selection, entityKey);
  });

  const content = replaceWithFragment(editorState, currentContentState, fragment);
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
    : handlePastedTextFromOutsideEditor(text, normalizeHTML(html), editorState);
};
