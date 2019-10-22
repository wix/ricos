import { isAtomicBlockFocused, removeBlock } from 'wix-rich-content-common';
import removeBlockAdjacentToAtomic from './atomicBlockRemovalUtil';

export default editorState => {
  const selection = editorState.getSelection();

  if (isAtomicBlockFocused(editorState)) {
    return removeBlock(editorState, selection.getAnchorKey());
  }

  if (!selection.isCollapsed()) {
    return null;
  }

  const content = editorState.getCurrentContent();
  const startKey = selection.getStartKey();
  const blockLength = content.getBlockForKey(startKey).getLength();

  // The cursor is somewhere within the text. Behave normally.
  if (selection.getStartOffset() < blockLength) {
    return null;
  }

  const blockAfter = content.getBlockAfter(startKey);

  if (!blockAfter || blockAfter.getType() !== 'atomic') {
    return null;
  }

  return removeBlockAdjacentToAtomic(editorState, true);
};
