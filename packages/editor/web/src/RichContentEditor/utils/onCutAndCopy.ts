// Copied from https://github.com/thibaudcolas/draftjs-conductor/blob/e8abd65b653f6eca239d4119ba635ada34bc0b0a/src/lib/api/copypaste.js
// Used our convertToRaw to support Collapsible List & Table

import { EditorState, ContentState } from 'wix-rich-content-editor-common';
import { convertToRaw } from '../../../lib/editorStateConversion';
import getContentStateFragment from 'draft-js/lib/getContentStateFragment';
import getDraftEditorSelection from 'draft-js/lib/getDraftEditorSelection';

// Custom attribute to store Draft.js content in the HTML clipboard.
const FRAGMENT_ATTR = 'data-draftjs-conductor-fragment';

const DRAFT_DECORATOR = '[data-contents="true"] [contenteditable="false"]';

// Checks whether the selection is inside a decorator or not.
// This is important to change the copy-cut behavior accordingly.
const isSelectionInDecorator = (selection: Selection | null) => {
  const { anchorNode, focusNode } = selection || {};
  if (!anchorNode || !focusNode) {
    return false;
  }

  const anchor = anchorNode instanceof Element ? anchorNode : anchorNode.parentElement;
  const focus = focusNode instanceof Element ? focusNode : focusNode.parentElement;

  const anchorDecorator = anchor && anchor.closest(DRAFT_DECORATOR);
  const focusDecorator = focus && focus.closest(DRAFT_DECORATOR);

  return (
    anchorDecorator &&
    focusDecorator &&
    (anchorDecorator.contains(focusDecorator) || focusDecorator.contains(anchorDecorator))
  );
};

// Get clipboard content from the selection like Draft.js would.
const getSelectedContent = (editorState: EditorState, editorRoot: HTMLElement) => {
  const { selectionState } = getDraftEditorSelection(editorState, editorRoot);

  const fragment = getContentStateFragment(editorState.getCurrentContent(), selectionState);

  // If the selection contains no content (according to Draft.js), use the default browser behavior.
  // This happens when selecting text that's within contenteditable=false blocks in Draft.js.
  // See https://github.com/thibaudcolas/draftjs-conductor/issues/12.
  const isEmpty = fragment.every(block => {
    return block.getText().length === 0;
  });

  return isEmpty ? null : fragment;
};

const onCutAndCopy = (ref, e) => {
  const selection = window.getSelection();

  // Completely skip event handling if clipboardData is not supported (IE11 is out).
  // Also skip if there is no selection ranges.
  // Or if the selection is fully within a decorator.
  if (
    !selection ||
    !e.clipboardData ||
    selection?.rangeCount === 0 ||
    isSelectionInDecorator(selection)
  ) {
    return;
  }

  const fragment = getSelectedContent(ref._latestEditorState, ref.editor);

  // Override the default behavior if there is selected content.
  if (fragment) {
    const content = ContentState.createFromBlockArray(fragment.toArray());
    const serialisedContent = JSON.stringify(convertToRaw(content));

    // Create a temporary element to store the selection’s HTML.
    // See also Rangy's implementation: https://github.com/timdown/rangy/blob/1e55169d2e4d1d9458c2a87119addf47a8265276/src/core/domrange.js#L515-L520.
    const fragmentElt = document.createElement('div');
    // Modern browsers only support a single range.
    fragmentElt.appendChild(selection.getRangeAt(0).cloneContents());
    fragmentElt.setAttribute(FRAGMENT_ATTR, serialisedContent);
    // We set the style property to replicate the browser's behavior of inline styles in rich text copy-paste.
    // In Draft.js, this is important for line breaks to be interpreted correctly when pasted into another word processor.
    // See https://github.com/facebook/draft-js/blob/a1f4593d8fa949954053e5d5840d33ce1d1082c6/src/component/base/DraftEditor.react.js#L328.
    fragmentElt.setAttribute('style', 'white-space: pre-wrap;');

    e.clipboardData.setData('text/plain', selection.toString());
    e.clipboardData.setData('text/html', fragmentElt.outerHTML);

    e.preventDefault();
  }
};

export const onCopy = (ref, e) => {
  onCutAndCopy(ref, e);
  import(/* webpackPrefetch: true */ 'draft-js/lib/editOnCopy').then(editOnCopy =>
    editOnCopy?.default?.(ref, e)
  );
};
export const onCut = (ref, e) => {
  onCutAndCopy(ref, e);
  import(/* webpackPrefetch: true */ 'draft-js/lib/editOnCut').then(editOnCut =>
    editOnCut?.default?.(ref, e)
  );
};
