import { EditorState, Modifier, RichUtils, SelectionState, AtomicBlockUtils } from 'draft-js';
import { cloneDeep, flatMap, findIndex, findLastIndex, countBy } from 'lodash';

function createSelection({ blockKey, anchorOffset, focusOffset }) {
  return SelectionState.createEmpty(blockKey).merge({
    anchorOffset,
    focusOffset,
  });
}

export const insertLinkInPosition = (
  editorState,
  blockKey,
  start,
  end,
  { url, targetBlank, nofollow, anchorTarget, relValue }
) => {
  const selection = createSelection({ blockKey, anchorOffset: start, focusOffset: end });

  return insertLink(editorState, selection, {
    url,
    targetBlank,
    nofollow,
    anchorTarget,
    relValue,
  });
};

export const insertLinkAtCurrentSelection = (editorState, data) => {
  let selection = getSelection(editorState);
  let newEditorState = editorState;
  const { url } = data;
  if (selection.isCollapsed()) {
    const contentState = Modifier.insertText(editorState.getCurrentContent(), selection, url);
    selection = selection.merge({ focusOffset: selection.getFocusOffset() + url.length });
    newEditorState = EditorState.push(editorState, contentState, 'insert-characters');
  }
  let editorStateWithLink;
  if (isSelectionBelongsToExsistingLink(newEditorState, selection)) {
    const blockKey = selection.getStartKey();
    const block = newEditorState.getCurrentContent().getBlockForKey(blockKey);
    const entityKey = block.getEntityAt(selection.getStartOffset());
    editorStateWithLink = setEntityData(newEditorState, entityKey, createLinkEntityData(data));
  } else {
    editorStateWithLink = insertLink(newEditorState, selection, data);
  }

  return EditorState.forceSelection(
    editorStateWithLink,
    selection.merge({ anchorOffset: selection.focusOffset })
  );
};

function isSelectionBelongsToExsistingLink(editorState, selection) {
  const startOffset = selection.getStartOffset();
  const endOffset = selection.getEndOffset();
  return getSelectedLinks(editorState).find(({ range }) => {
    return range[0] <= startOffset && range[1] >= endOffset;
  });
}

function insertLink(editorState, selection, data) {
  const oldSelection = editorState.getSelection();
  const newContentState = Modifier.applyInlineStyle(
    addEntity(editorState, selection, {
      type: 'LINK',
      data: createLinkEntityData(data),
    }).getCurrentContent(),
    selection,
    'UNDERLINE'
  ).set('selectionAfter', oldSelection);

  return EditorState.push(editorState, newContentState, 'change-inline-style');
}

function createLinkEntityData({ url, targetBlank, nofollow, anchorTarget, relValue }) {
  return {
    url,
    target: targetBlank ? '_blank' : anchorTarget || '_self',
    rel: nofollow ? 'nofollow' : relValue || 'noopener noreferrer',
  };
}

function addEntity(editorState, targetSelection, entityData) {
  const entityKey = createEntity(editorState, entityData);
  const oldSelection = editorState.getSelection();
  const newContentState = Modifier.applyEntity(
    editorState.getCurrentContent(),
    targetSelection,
    entityKey
  ).set('selectionAfter', oldSelection);

  return EditorState.push(editorState, newContentState, 'apply-entity');
}

export const hasLinksInBlock = (block, contentState) => {
  return !!getLinkRangesInBlock(block, contentState).length;
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
  const selection = editorState.getSelection();
  const newEditorState = getSelectedLinks(editorState).reduce(
    (prevState, { key, range }) => removeLink(prevState, key, range),
    editorState
  );

  return EditorState.forceSelection(
    newEditorState,
    selection.merge({ anchorOffset: selection.focusOffset })
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

export const setEntityData = (editorState, entityKey, data) => {
  if (entityKey) {
    const contentState = editorState.getCurrentContent();
    contentState.replaceEntityData(entityKey, cloneDeep(data));
  }
  return editorState;
};

export const isAtomicBlockFocused = editorState => {
  const { anchorKey, focusKey } = editorState.getSelection();
  const block = editorState.getCurrentContent().getBlockForKey(anchorKey).type;
  return anchorKey === focusKey && block === 'atomic';
};

export const replaceWithEmptyBlock = (editorState, blockKey) => {
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

// export const setSelectionToBlock = (newEditorState, setEditorState, newActiveBlock) => {
//   const editorState = newEditorState;
//   const offsetKey = DraftOffsetKey.encode(newActiveBlock.getKey(), 0, 0);
//   const node = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0];
//   const selection = window.getSelection();
//   const range = document.createRange();
//   range.setStart(node, 0);
//   range.setEnd(node, 0);
//   selection.removeAllRanges();
//   selection.addRange(range);

//   setEditorState(
//     EditorState.forceSelection(
//       editorState,
//       new SelectionState({
//         anchorKey: newActiveBlock.getKey(),
//         anchorOffset: 0,
//         focusKey: newActiveBlock.getKey(),
//         focusOffset: 0,
//         isBackward: false,
//       })
//     )
//   );
// };

// **************************** this function is for oneApp ****************************
export const createBlockAndFocus = (editorState, data, pluginType) => {
  const { newBlock, newSelection, newEditorState } = createBlock(editorState, data, pluginType);
  window.getSelection().removeAllRanges();
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        newEditorState: EditorState.forceSelection(newEditorState, newSelection),
        newBlock,
      });
    }, 0);
  });
};

export const createBlock = (editorState, data, type) => {
  const currentEditorState = editorState;
  const contentState = currentEditorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', cloneDeep(data));
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(currentEditorState, entityKey, ' ');
  const recentlyCreatedKey = newEditorState.getSelection().getAnchorKey();
  // when adding atomic block, there is the atomic itself, and then there is a text block with one space,
  // so get the block before the space
  const newBlock = newEditorState.getCurrentContent().getBlockBefore(recentlyCreatedKey);
  const newSelection = SelectionState.createEmpty(newBlock.getKey());
  return { newBlock, newSelection, newEditorState };
};

export const deleteBlock = (editorState, blockKey) => {
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(blockKey);
  const previousBlock = contentState.getBlockBefore(blockKey);
  const selectionRange = new SelectionState({
    anchorKey: previousBlock.key,
    anchorOffset: previousBlock.text.length,
    focusKey: blockKey,
    focusOffset: block.text.length,
  });
  const newContentState = Modifier.removeRange(contentState, selectionRange, 'forward');
  return EditorState.push(editorState, newContentState, 'remove-range');
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
  const selection = createSelection({ blockKey, anchorOffset: start, focusOffset: end });
  const newContentState = Modifier.removeInlineStyle(
    RichUtils.toggleLink(editorState, selection, null).getCurrentContent(),
    selection,
    'UNDERLINE'
  );

  return EditorState.push(editorState, newContentState, 'change-inline-style');
}

export function createEntity(editorState, { type, mutability = 'MUTABLE', data }) {
  return editorState
    .getCurrentContent()
    .createEntity(type, mutability, data)
    .getLastCreatedEntityKey();
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

export const getEntities = (editorState, entityType = null) => {
  const currentContent = editorState.getCurrentContent();
  const entities = [];

  currentContent.getBlockMap().forEach(block => {
    block.findEntityRanges(character => {
      const char = character.getEntity();
      const entity = !!char && currentContent.getEntity(char);
      if (!entityType || entity.getType() === entityType) {
        entities.push(entity);
      }
    });
  });
  return entities;
};

const countByType = obj => countBy(obj, x => x.type);

const getBlockTypePlugins = blocks =>
  blocks.filter(block => block.type !== 'unstyled' && block.type !== 'atomic');

export function getPostContentSummary(editorState) {
  if (Object.entries(editorState).length === 0) return;
  const blocks = editorState.getCurrentContent().getBlocksAsArray();
  const entries = getEntities(editorState);
  const blockPlugins = getBlockTypePlugins(blocks);
  return {
    ...countByType(blockPlugins),
    ...countByType(entries),
  };
}

//ATM, looks for deleted plugins.
//onChanges - for phase 2?
//Added Plugins - checked elsewhere via toolbar clicks
export const calculateDiff = async (prevState, newState, onPluginDelete) => {
  const countByType = obj => countBy(obj, x => x.type);
  const prevEntities = countByType(getEntities(prevState));
  const currEntities = countByType(getEntities(newState));
  const prevBlocks = prevState.getCurrentContent().getBlocksAsArray();
  const currBlocks = newState.getCurrentContent().getBlocksAsArray();
  const prevBlockPlugins = countByType(getBlockTypePlugins(prevBlocks));
  const currBlockPlugins = countByType(getBlockTypePlugins(currBlocks));

  const prevPluginsTotal = Object.assign(prevEntities, prevBlockPlugins);
  const currPluginsTotal = Object.assign(currEntities, currBlockPlugins);

  Object.keys(prevPluginsTotal).forEach(type => {
    if (!currPluginsTotal[type] || prevPluginsTotal[type] > currPluginsTotal[type]) {
      onPluginDelete(type);
    }
  });

  // onPluginChange -> for Phase 2
  //else {
  // const before = beforePlugins[key];
  // const after = afterPlugins[key];
  // if (JSON.stringify(before) !== JSON.stringify(after))
  //   onPluginChange(type, { from: before, to: after });
  //}
};

// a selection of the new content from the last change
function createLastChangeSelection(editorState) {
  const content = editorState.getCurrentContent();
  const selectionBefore = content.getSelectionBefore();
  return content.getSelectionAfter().merge({
    anchorKey: selectionBefore.getStartKey(),
    anchorOffset: selectionBefore.getStartOffset(),
  });
}

export function fixPastedLinks(editorState, { anchorTarget, relValue }) {
  const lastChangeSelection = createLastChangeSelection(editorState);
  const links = getSelectedLinks(setSelection(editorState, lastChangeSelection));
  const content = editorState.getCurrentContent();
  links.forEach(({ key: blockKey, range }) => {
    const block = content.getBlockForKey(blockKey);
    const entityKey = block.getEntityAt(range[0]);
    const data = entityKey && content.getEntity(entityKey).getData();
    const url = data.url || data.href;
    if (url) {
      content.replaceEntityData(entityKey, {
        url,
        target: anchorTarget || '_self',
        rel: relValue || 'noopener noreferrer',
      });
    }
  });
  return editorState;
}

export function getFocusedBlockKey(editorState) {
  const selection = editorState.getSelection();
  return selection.isCollapsed() && selection.getAnchorKey();
}

export function getBlockInfo(editorState, blockKey) {
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(blockKey);
  const entityKey = block.getEntityAt(0);
  const entity = (entityKey && contentState.getEntity(entityKey)) || {};
  const entityData = entity.data;
  const type = entity.type;

  return { type: type || 'text', entityData };
}

export function setSelection(editorState, selection) {
  return EditorState.acceptSelection(editorState, selection);
}
