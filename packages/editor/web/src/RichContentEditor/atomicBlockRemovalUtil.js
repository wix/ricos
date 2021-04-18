import {
  EditorState,
  SelectionState,
  DraftOffsetKey,
  Modifier,
} from 'wix-rich-content-editor-common';

function setNativeSelectionToBlock(block) {
  const offsetKey = DraftOffsetKey.encode(block.getKey(), 0, 0);
  const node = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0];
  const selection = window.getSelection();
  const range = document.createRange();
  range.setStart(node, 0);
  range.setEnd(node, 0);
  selection.removeAllRanges();
  selection.addRange(range);
}

function getNewBlockMap(content, startKey, edgeBlockKey) {
  let newBlockMap = content.getBlockMap();
  if (startKey !== edgeBlockKey) {
    newBlockMap = newBlockMap.delete(startKey);
  } else {
    const currentBlock = content.getBlockForKey(edgeBlockKey);
    if (currentBlock.getType() === 'blockquote' && currentBlock.getText() === '') {
      const blockSelection = SelectionState.createEmpty(startKey);
      newBlockMap = Modifier.setBlockType(content, blockSelection, 'unstyled').getBlockMap();
    }
  }
  return newBlockMap;
}

function removeBlockAdjacentToAtomic(editorState, isAbove) {
  const content = editorState.getCurrentContent();
  const startKey = editorState.getSelection().getStartKey();
  const adjacentBlock = isAbove
    ? content.getBlockAfter(startKey)
    : content.getBlockBefore(startKey);
  const edgeBlockKey = isAbove ? content.getFirstBlock().key : content.getLastBlock().key;

  const blockMap = getNewBlockMap(content, startKey, edgeBlockKey);
  const newSelection = SelectionState.createEmpty(adjacentBlock.getKey());

  const withoutCurrentBlock = content.merge({
    blockMap,
    selectionAfter: newSelection,
  });
  if (withoutCurrentBlock !== content) {
    setNativeSelectionToBlock(adjacentBlock);

    return EditorState.forceSelection(
      EditorState.push(editorState, withoutCurrentBlock, 'remove-range'),
      newSelection
    );
  }

  return null;
}

export default removeBlockAdjacentToAtomic;
