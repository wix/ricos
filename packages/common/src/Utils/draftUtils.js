import { EditorState, Modifier, RichUtils, SelectionState } from '@wix/draft-js';
import flatMap from 'lodash/flatMap';
import findIndex from 'lodash/findIndex';
import findLastIndex from 'lodash/findLastIndex';

export const insertLink = (editorState, { url, targetBlank, nofollow, anchorTarget, relValue }) => {
  const selection = getSelection(editorState);
  const content = editorState.getCurrentContent();
  const contentStateWithEntity = content.createEntity('LINK', 'MUTABLE', {
    url,
    target: targetBlank ? '_blank' : anchorTarget || '_self',
    rel: nofollow ? 'nofollow' : relValue || 'noopener',
  });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  let newSelection = selection;
  let newEditorState;

  if (!selection.isCollapsed()) {
    newEditorState = RichUtils.toggleLink(editorState, selection, entityKey);
  } else {
    const offset = selection.getStartOffset();
    const focusOffset = offset + url.length;
    const blockKey = selection.getStartKey();
    const linkRange = new SelectionState({
      anchorOffset: offset,
      anchorKey: blockKey,
      focusOffset,
      focusKey: blockKey,
    });

    const content = editorState.getCurrentContent();
    const newContent = Modifier.insertText(content, selection, url);
    newEditorState = RichUtils.toggleLink(
      EditorState.push(editorState, newContent, 'insert-characters'),
      linkRange,
      entityKey
    );

    newSelection = new SelectionState({
      anchorOffset: focusOffset,
      anchorKey: blockKey,
      focusOffset,
      focusKey: blockKey,
    });
  }

  return EditorState.forceSelection(newEditorState, newSelection);
};

export const hasLinksInSelection = editorState => {
  return !!getSelectedLinks(editorState).length;
};

export const getLinkDataInSelection = editorState => {
  const contentState = editorState.getCurrentContent();
  const selection = getSelection(editorState);
  const startKey = selection.getStartKey();
  const startOffset = selection.getStartOffset();
  const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
  const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
  return linkKey ? contentState.getEntity(linkKey).getData() : {};
};

export const removeLinksInSelection = editorState => {
  return getSelectedLinks(editorState).reduce(
    (prevState, { key, range }) => removeLink(prevState, key, range),
    editorState
  );
};

export const getTextAlignment = (editorState, defaultAlignment = 'left') => {
  const selection = getSelection(editorState);
  const currentContent = editorState.getCurrentContent();
  const contentBlock = currentContent.getBlockForKey(selection.getStartKey());
  const {
    data: { textAlignment },
  } = contentBlock.toJS();
  return textAlignment || defaultAlignment;
};

export const setTextAlignment = (editorState, textAlignment) => {
  return mergeBlockData(editorState, { textAlignment });
};

export const mergeBlockData = (editorState, data) => {
  const contentState = Modifier.mergeBlockData(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    data
  );
  return EditorState.push(editorState, contentState, 'change-block-data');
};

export const getAnchorBlockData = editorState => {
  //*** anchor is where the user began the selection
  const anchorKey = editorState.getSelection().getAnchorKey();
  const block = editorState.getCurrentContent().getBlockForKey(anchorKey);
  return block.get('data').toJS();
};

export const isAtomicBlockFocused = editorState => {
  const { anchorKey, focusKey } = editorState.getSelection();
  const block = editorState.getCurrentContent().getBlockForKey(anchorKey).type;
  return anchorKey === focusKey && block === 'atomic';
};

export const removeBlock = (editorState, blockKey) => {
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(blockKey);
  const blockRange = new SelectionState({
    anchorKey: blockKey,
    anchorOffset: 0,
    focusKey: blockKey,
    focusOffset: block.getLength(),
  });
  const withoutBlock = Modifier.removeRange(contentState, blockRange, 'backward');
  const resetBlock = Modifier.setBlockType(
    withoutBlock,
    withoutBlock.getSelectionAfter(),
    'unstyled'
  );
  const newState = EditorState.push(editorState, resetBlock, 'remove-range');
  return EditorState.forceSelection(newState, resetBlock.getSelectionAfter());
};

export const getSelectedBlocks = editorState => {
  const blocks = editorState.getCurrentContent().getBlocksAsArray();
  const selection = getSelection(editorState);
  const firstIndex = findIndex(blocks, block => block.getKey() === selection.getAnchorKey());
  const lastIndex = findLastIndex(blocks, block => block.getKey() === selection.getFocusKey());

  return blocks.slice(firstIndex, lastIndex + 1);
};

export const getSelectionRange = (editorState, block) => {
  const selection = getSelection(editorState);
  const blockKey = block.getKey();
  const anchorKey = selection.getAnchorKey();
  const focusKey = selection.getFocusKey();
  const anchorOffset = selection.getAnchorOffset();
  const focusOffset = selection.getFocusOffset();
  let range;

  if (anchorKey === blockKey && focusKey === blockKey) {
    range = [anchorOffset, focusOffset];
  } else if (anchorKey === blockKey) {
    range = [anchorOffset, block.getLength()];
  } else if (focusKey === blockKey) {
    range = [0, focusOffset];
  } else {
    range = [0, block.getLength()];
  }

  return range;
};

export const isInSelectionRange = ([start, end], range) => {
  return !(start <= range[0] && end <= range[0]) && !(start >= range[1] && end >= range[1]);
};

function getSelectedLinks(editorState) {
  return flatMap(getSelectedBlocks(editorState), block =>
    getSelectedLinksInBlock(block, editorState)
  );
}

function getSelectedLinksInBlock(block, editorState) {
  const selectionRange = getSelectionRange(editorState, block);

  return getLinkRangesInBlock(block, editorState.getCurrentContent())
    .filter(linkRange => isInSelectionRange(selectionRange, linkRange))
    .map(linkRange => ({
      key: block.getKey(),
      range: linkRange,
    }));
}

function getLinkRangesInBlock(block, contentState) {
  const ranges = [];
  block.findEntityRanges(
    value => {
      const key = value.getEntity();
      return key && contentState.getEntity(key).type === 'LINK';
    },
    (start, end) => ranges.push([start, end])
  );

  return ranges;
}

function removeLink(editorState, blockKey, [start, end]) {
  let selection = SelectionState.createEmpty(blockKey);
  selection = selection.set('anchorOffset', start);
  selection = selection.set('focusOffset', end);
  return RichUtils.toggleLink(editorState, selection, null);
}

function getSelection(editorState) {
  let selection = editorState.getSelection();
  //todo: seems like this is wrong. Should be start/end key. Anchor/focus key have diffrent meaning. (reference https://developer.mozilla.org/en-US/docs/Web/API/Selection#Glossary)
  if (selection.getIsBackward()) {
    selection = new SelectionState({
      anchorKey: selection.getFocusKey(),
      anchorOffset: selection.getFocusOffset(),
      focusKey: selection.getAnchorKey(),
      focusOffset: selection.getAnchorOffset(),
    });
  }

  return selection;
}
