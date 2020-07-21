import {
  RichUtils,
  EditorState,
  isAtomicBlockFocused,
  replaceWithEmptyBlock,
  indentSelectedBlocks,
  getSelectedBlocks,
  getBlockText,
  // getBlockType,
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
  if (
    selection.isCollapsed() &&
    selection.getAnchorOffset() === 0 &&
    getBlockText(editorState) === ''
  ) {
    const withoutBlockStyle = RichUtils.tryToRemoveBlockStyle(editorState);

    if (withoutBlockStyle) {
      return EditorState.push(editorState, withoutBlockStyle, 'change-block-type');
    }
  }

  // let's try to decrease indentation
  if (selection.isCollapsed() && selection.getAnchorOffset() === 0) {
    const depth = getSelectedBlocks(editorState)[0].getDepth();
    if (depth > 0) {
      return indentSelectedBlocks(editorState, -1);
    }
  }

  // if (
  //   selection.isCollapsed() &&
  //   selection.getAnchorOffset() === 0 &&
  //   getBlockText(editorState) === '' &&
  //   getBlockType(editorState) !== 'unstyled'
  // ) {
  //   return editorState;
  // }

  return null;
};
