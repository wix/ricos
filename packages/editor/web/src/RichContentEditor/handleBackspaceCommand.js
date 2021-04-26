import {
  RichUtils,
  EditorState,
  isAtomicBlockFocused,
  replaceWithEmptyBlock,
  indentSelectedBlocks,
  getSelectedBlocks,
} from 'wix-rich-content-editor-common';
import removeBlockAdjacentToAtomic from './atomicBlockRemovalUtil';

export default editorState => {
  const selection = editorState.getSelection();

  if (isAtomicBlockFocused(editorState)) {
    return replaceWithEmptyBlock(editorState, selection.getAnchorKey());
  }

  if (!selection.isCollapsed() || selection.getAnchorOffset() || selection.getFocusOffset()) {
    return null;
  }

  // First, try to remove a preceding atomic block.
  const content = editorState.getCurrentContent();
  const startKey = selection.getStartKey();
  const blockBefore = content.getBlockBefore(startKey);

  if (blockBefore && blockBefore.getType() === 'atomic') {
    const withoutCurrentBlock = removeBlockAdjacentToAtomic(editorState, false);

    if (withoutCurrentBlock) {
      return withoutCurrentBlock;
    }
  }

  // If that doesn't succeed, try to remove the current block style.
  const withoutBlockStyle = RichUtils.tryToRemoveBlockStyle(editorState);

  if (withoutBlockStyle) {
    return EditorState.push(editorState, withoutBlockStyle, 'change-block-type');
  }

  // cases where cursor is at start of block
  if (selection.isCollapsed() && selection.getAnchorOffset() === 0) {
    // try to decrease indentation
    const depth = getSelectedBlocks(editorState)[0].getDepth();
    if (depth > 0) {
      return indentSelectedBlocks(editorState, -1);
    }
  }

  return null;
};
