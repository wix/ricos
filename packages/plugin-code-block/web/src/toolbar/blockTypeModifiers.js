import {
  EditorState,
  RichUtils,
  Modifier,
  genKey,
  ContentBlock,
  BlockMapBuilder,
  SelectionState,
  createSelection,
} from 'wix-rich-content-editor-common';
import { List } from 'immutable';

export const hasBlockType = (blockType, editorState) => {
  const currentBlockType = editorState
    .getCurrentContent()
    .getBlockForKey(editorState.getSelection().getStartKey())
    .getType();

  return blockType === currentBlockType;
};

export const toggleBlockType = (blockType, editorState) =>
  RichUtils.toggleBlockType(editorState, blockType);

export const toggleBlockTypeAndEnsureSpaces = (blockType, editorState) => {
  if (hasBlockType(blockType, editorState)) {
    return toggleBlockType(blockType, editorState);
  }

  const initialSelection = editorState.getSelection();
  const initialContentState = editorState.getCurrentContent();

  const allBlocks = initialContentState.getBlockMap();

  const firstKey = initialSelection.getStartKey();
  const lastKey = initialSelection.getEndKey();

  const selectedBlocks = getBlockRange(firstKey, lastKey, allBlocks);
  const newContentState = setBlockTypeAndMerge(blockType, selectedBlocks, initialContentState);

  const newEditorState = EditorState.push(editorState, newContentState, 'change-block-type');
  const selection = createSelection({
    blockKey: newContentState.getBlockAfter(firstKey).key,
    anchorOffset: 0,
    focusOffset: 0,
  });
  return EditorState.forceSelection(newEditorState, selection);
};

function getBlockRange(firstKey, lastKey, blocks) {
  return blocks
    .skipUntil(block => firstKey === block.getKey())
    .reverse()
    .skipUntil(block => lastKey === block.getKey())
    .reverse();
}

function setBlockTypeAndMerge(blockType, blocks, contentState) {
  if (!blocks.count()) {
    return contentState;
  }

  const blockGroup = blocks.skipWhile(isAtomic).takeWhile(isNotAtomic);

  let modifiedContentState = contentState;
  if (blockGroup.count()) {
    const firstKey = blockGroup.first().getKey();
    const lastKey = blockGroup.last().getKey();
    const afterMove = moveTextToFirstBlock(blockGroup, contentState);
    const afterTypeChange = setBlockType(firstKey, blockType, afterMove);
    modifiedContentState = replaceSelectedBlocksWithCodeBlock(firstKey, lastKey, afterTypeChange);
  }

  const filteredBlocks = blocks.skipWhile(isAtomic).skipWhile(isNotAtomic);

  return setBlockTypeAndMerge(blockType, filteredBlocks, modifiedContentState);
}

function moveTextToFirstBlock(blocks, contentState) {
  const firstKey = blocks.first().getKey();
  return blocks.rest().reduce((contentState, block, key) => {
    const targetLength = contentState.getBlockForKey(firstKey).getLength();
    const newLineTarget = SelectionState.createEmpty(firstKey)
      .set('anchorOffset', targetLength)
      .set('focusOffset', targetLength);

    const withNewLine = Modifier.insertText(contentState, newLineTarget, '\n');

    const sourceRange = SelectionState.createEmpty(key)
      .set('anchorOffset', 0)
      .set('focusOffset', block.getLength());
    const textTarget = newLineTarget
      .set('anchorOffset', targetLength + 1)
      .set('focusOffset', targetLength + 1);

    return Modifier.moveText(withNewLine, sourceRange, textTarget);
  }, contentState);
}

function isAtomic(block) {
  return block.getType() === 'atomic';
}

function isNotAtomic(block) {
  return !isAtomic(block);
}

function setBlockType(key, blockType, contentState) {
  const targetRange = SelectionState.createEmpty(key);
  return Modifier.setBlockType(contentState, targetRange, blockType);
}

function replaceSelectedBlocksWithCodeBlock(firstKey, lastKey, contentState) {
  const fragment = BlockMapBuilder.createFromArray([
    createEmptyBlock(),
    contentState.getBlockForKey(firstKey),
    createEmptyBlock(),
  ]);

  const target = new SelectionState({
    anchorKey: firstKey,
    anchorOffset: 0,
    focusKey: lastKey,
    focusOffset: contentState.getBlockForKey(lastKey).getLength(),
  });

  return Modifier.replaceWithFragment(contentState, target, fragment);
}

function createEmptyBlock() {
  return new ContentBlock({
    key: genKey(),
    type: 'unstyled',
    text: '',
    characterList: List(), // eslint-disable-line new-cap
  });
}
