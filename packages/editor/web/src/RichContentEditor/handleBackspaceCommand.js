import {
  RichUtils,
  EditorState,
  isAtomicBlockFocused,
  replaceWithEmptyBlock,
  indentSelectedBlocks,
  getCharacterBeforeSelection,
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

  // Last, try to decrease indentation
  const character = getCharacterBeforeSelection(editorState);
  if (selection.isCollapsed() && !character) {
    return indentSelectedBlocks(editorState, -1);
  }

  return null;
};
