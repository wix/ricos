import {
  EditorState,
  Modifier,
  RichUtils,
  SelectionState,
  AtomicBlockUtils,
  ContentBlock,
  ContentState,
  EntityInstance,
  RawDraftEntity,
  EditorChangeType,
} from '@wix/draft-js';

import { cloneDeep, flatMap, findIndex, findLastIndex, countBy, debounce, times } from 'lodash';
import { TEXT_TYPES } from '../consts';

type LinkDataUrl = {
  url: string;
  targetBlank?: boolean;
  nofollow?: boolean;
  anchorTarget?: string;
  relValue?: string;
};

type LinkData = LinkDataUrl & { anchor?: string };

export function createSelection({
  blockKey,
  anchorOffset,
  focusOffset,
}: {
  blockKey: string;
  anchorOffset: number;
  focusOffset: number;
}): SelectionState {
  return SelectionState.createEmpty(blockKey).merge({
    anchorOffset,
    focusOffset,
  }) as SelectionState;
}

export const insertLinkInPosition = (
  editorState: EditorState,
  blockKey: string,
  start: number,
  end: number,
  { url, targetBlank, nofollow, anchorTarget, relValue }: LinkDataUrl
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

export const updateLinkAtCurrentSelection = (editorState: EditorState, data): EditorState => {
  const selection = getSelection(editorState);
  const editorStateWithLink = updateLink(selection, editorState, data);
  return EditorState.forceSelection(
    editorStateWithLink,
    selection.merge({ anchorOffset: selection.getFocusOffset() }) as SelectionState
  );
};

export const getBlockAtStartOfSelection = (editorState: EditorState) => {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(selectionState.getStartKey());

  return block;
};

export const insertLinkAtCurrentSelection = (
  editorState: EditorState,
  { text, ...entityData }: { text: string } & LinkDataUrl
) => {
  let selection = getSelection(editorState);
  let newEditorState = editorState;
  if (selection.isCollapsed()) {
    const { url } = entityData;
    const urlToInsertWhenCollapsed = text ? text : url;
    const contentState = Modifier.insertText(
      editorState.getCurrentContent(),
      selection,
      urlToInsertWhenCollapsed
    );
    selection = selection.merge({
      focusOffset: selection.getFocusOffset() + urlToInsertWhenCollapsed.length,
    }) as SelectionState;
    newEditorState = EditorState.push(editorState, contentState, 'insert-characters');
  }
  const editorStateWithLink = isSelectionBelongsToExsistingLink(newEditorState, selection)
    ? updateLink(selection, newEditorState, entityData)
    : insertLink(newEditorState, selection, entityData);

  return EditorState.forceSelection(
    editorStateWithLink,
    selection.merge({ anchorOffset: selection.getFocusOffset() }) as SelectionState
  );
};

function isSelectionBelongsToExsistingLink(editorState: EditorState, selection: SelectionState) {
  const startOffset = selection.getStartOffset();
  const endOffset = selection.getEndOffset();
  return getSelectedLinks(editorState).find(({ range }) => {
    return range[0] <= startOffset && range[1] >= endOffset;
  });
}

function updateLink(selection: SelectionState, editorState: EditorState, linkData: LinkData) {
  const blockKey = selection.getStartKey();
  const block = editorState.getCurrentContent().getBlockForKey(blockKey);
  const entityKey = block.getEntityAt(selection.getStartOffset());
  return setEntityData(editorState, entityKey, createLinkEntityData(linkData));
}

function preventLinkInlineStyleForNewLine(editorState: EditorState, selection: SelectionState) {
  const focusOffset = selection.getFocusOffset();
  const selectionForSpace: SelectionState = createSelection({
    blockKey: selection.getAnchorKey(),
    anchorOffset: focusOffset,
    focusOffset,
  });
  //insert dummy space after link for preventing underline inline style to the new line
  return Modifier.insertText(editorState.getCurrentContent(), selectionForSpace, ' ');
}

function insertLink(editorState: EditorState, selection: SelectionState, linkData: LinkData) {
  const oldSelection = editorState.getSelection();
  const editorWithLink = addEntity(editorState, selection, {
    type: 'LINK',
    data: createLinkEntityData(linkData),
    mutability: 'MUTABLE',
  });
  const isNewLine = selection.getAnchorKey() !== oldSelection.getAnchorKey(); //check weather press enter or space after link
  const contentState = isNewLine
    ? preventLinkInlineStyleForNewLine(editorWithLink, selection)
    : editorWithLink.getCurrentContent();

  return EditorState.push(
    editorState,
    Modifier.applyInlineStyle(contentState, selection, 'UNDERLINE').set(
      'selectionAfter',
      oldSelection
    ) as ContentState,
    'change-inline-style'
  );
}

export function createLinkEntityData({
  url,
  anchor,
  targetBlank,
  nofollow,
  anchorTarget,
  relValue,
}: LinkData) {
  if (url) {
    const target = targetBlank ? '_blank' : anchorTarget !== '_blank' ? anchorTarget : '_self';
    const rel = nofollow ? 'nofollow' : relValue !== 'nofollow' ? relValue : 'noopener';
    return {
      url,
      target,
      rel,
    };
  } else {
    return { anchor };
  }
}

function addEntity(
  editorState: EditorState,
  targetSelection: SelectionState,
  entityData: RawDraftEntity
) {
  const entityKey = createEntity(editorState, entityData);
  const oldSelection = editorState.getSelection();
  const newContentState = Modifier.applyEntity(
    editorState.getCurrentContent(),
    targetSelection,
    entityKey
  ).set('selectionAfter', oldSelection) as ContentState;

  return EditorState.push(editorState, newContentState, 'apply-entity');
}

export const hasLinksInBlock = (block: ContentBlock, contentState: ContentState) => {
  return !!getLinkRangesInBlock(block, contentState).length;
};

export const hasLinksInSelection = (editorState: EditorState) => {
  return !!getSelectedLinks(editorState).length;
};

export const getLinkDataInSelection = (editorState: EditorState) => {
  const contentState = editorState.getCurrentContent();
  const selection = getSelection(editorState);
  const startKey = selection.getStartKey();
  const startOffset = selection.getStartOffset();
  const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
  const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
  return linkKey ? contentState.getEntity(linkKey).getData() : {};
};

export const removeLinksInSelection = (editorState: EditorState) => {
  const selection = editorState.getSelection();
  const newEditorState = getSelectedLinks(editorState).reduce(
    (prevState, { key, range }) => removeLink(prevState, key, range),
    editorState
  );

  return EditorState.forceSelection(
    newEditorState,
    selection.merge({ anchorOffset: selection.getFocusOffset() }) as SelectionState
  );
};

export const getTextAlignment = (editorState: EditorState, defaultAlignment = 'left') => {
  const selection = getSelection(editorState);
  const currentContent = editorState.getCurrentContent();
  const contentBlock = currentContent.getBlockForKey(selection.getStartKey());
  const {
    data: { textAlignment },
  } = contentBlock.toJS();
  return textAlignment || defaultAlignment;
};

export const setTextAlignment = (editorState: EditorState, textAlignment: string) => {
  return mergeBlockData(editorState, { textAlignment });
};

export const mergeBlockData = (editorState: EditorState, data) => {
  const contentState = Modifier.mergeBlockData(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    data
  );
  return EditorState.push(editorState, contentState, 'change-block-data');
};

export const getAnchorBlockData = (editorState: EditorState) => {
  //*** anchor is where the user began the selection
  const anchorKey = editorState.getSelection().getAnchorKey();
  const block = editorState.getCurrentContent().getBlockForKey(anchorKey);
  return block.get('data').toJS();
};

export const setEntityData = (editorState: EditorState, entityKey: string, data) => {
  if (entityKey) {
    const contentState = editorState.getCurrentContent();
    contentState.replaceEntityData(entityKey, cloneDeep(data));
  }
  return editorState;
};

export const isAtomicBlockFocused = (editorState: EditorState) => {
  const selection = editorState.getSelection();
  const [anchorKey, focusKey] = [selection.getAnchorKey(), selection.getFocusKey()];
  const block = editorState
    .getCurrentContent()
    .getBlockForKey(anchorKey)
    .getType();
  return anchorKey === focusKey && block === 'atomic';
};

export const replaceWithEmptyBlock = (editorState: EditorState, blockKey: string) => {
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
export const createBlockAndFocus = (editorState: EditorState, data, pluginType: string) => {
  const { newBlock, newSelection, newEditorState } = createBlock(editorState, data, pluginType);
  window.getSelection()?.removeAllRanges();
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        newEditorState: EditorState.forceSelection(newEditorState, newSelection),
        newBlock,
      });
    }, 0);
  });
};

export const createBlock = (editorState: EditorState, data, type: string) => {
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

export const deleteBlock = (editorState: EditorState, blockKey: string) => {
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(blockKey);
  const previousBlock = contentState.getBlockBefore(blockKey) || block;
  const anchorOffset = previousBlock.getKey() === blockKey ? 0 : previousBlock.getText().length;
  const selectionRange = new SelectionState({
    anchorKey: previousBlock.getKey(),
    anchorOffset,
    focusKey: blockKey,
    focusOffset: block.getText().length,
    hasFocus: true,
  });
  const newContentState = Modifier.removeRange(contentState, selectionRange, 'forward');
  return EditorState.push(editorState, newContentState, 'remove-range');
};

export const deleteBlockText = (editorState: EditorState, blockKey: string) => {
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(blockKey);
  const selectionRange = createSelection({
    blockKey,
    anchorOffset: 0,
    focusOffset: block.getText().length,
  });
  const newContentState = Modifier.replaceText(contentState, selectionRange, '');
  return EditorState.push(editorState, newContentState, 'remove-range');
};

export const getSelectedBlocks = (editorState: EditorState) => {
  const blocks = editorState.getCurrentContent().getBlocksAsArray();
  const selection = getSelection(editorState);
  const firstIndex = findIndex(blocks, block => block.getKey() === selection.getAnchorKey());
  const lastIndex = findLastIndex(blocks, block => block.getKey() === selection.getFocusKey());

  return blocks.slice(firstIndex, lastIndex + 1);
};

export const getSelectionRange = (editorState: EditorState, block: ContentBlock) => {
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

export const isInSelectionRange = ([start, end]: [number, number], range: [number, number]) => {
  return !(start <= range[0] && end <= range[0]) && !(start >= range[1] && end >= range[1]);
};

function getSelectedLinks(editorState: EditorState) {
  return flatMap(getSelectedBlocks(editorState), block =>
    getSelectedLinksInBlock(block, editorState)
  );
}

function getSelectedLinksInBlock(block: ContentBlock, editorState: EditorState) {
  const selectionRange = getSelectionRange(editorState, block);

  return getLinkRangesInBlock(block, editorState.getCurrentContent())
    .filter(linkRange => isInSelectionRange(selectionRange, linkRange))
    .map(linkRange => ({
      key: block.getKey(),
      range: linkRange,
    }));
}

export function getLinkRangesInBlock(block: ContentBlock, contentState: ContentState) {
  const ranges: [number, number][] = [];
  block.findEntityRanges(
    value => {
      const key = value.getEntity();
      return !!key && contentState.getEntity(key).getType() === 'LINK';
    },
    (start, end) => ranges.push([start, end])
  );

  return ranges;
}

function removeLink(editorState: EditorState, blockKey: string, [start, end]: [number, number]) {
  const selection = createSelection({ blockKey, anchorOffset: start, focusOffset: end });
  const newContentState = Modifier.removeInlineStyle(
    RichUtils.toggleLink(editorState, selection, null).getCurrentContent(),
    selection,
    'UNDERLINE'
  );

  return EditorState.push(editorState, newContentState, 'change-inline-style');
}

export function createEntity(
  editorState: EditorState,
  { type, mutability = 'MUTABLE', data }: RawDraftEntity
) {
  return editorState
    .getCurrentContent()
    .createEntity(type, mutability, data)
    .getLastCreatedEntityKey();
}

function getSelection(editorState: EditorState) {
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

// TODO: refactor function @Barackos
export const getEntities = (editorState: EditorState, entityType?: string): EntityInstance[] => {
  const currentContent = editorState.getCurrentContent();
  const entities: EntityInstance[] = [];

  currentContent.getBlockMap().forEach(block => {
    block?.findEntityRanges(
      character => {
        const char = character.getEntity();
        const entity = !!char && currentContent.getEntity(char);
        // regular text block
        if (entity === false) {
          entities.push({
            getType: () => 'text',
            getData: () => '',
          } as EntityInstance);
        } else if (!entityType || entity.getType() === entityType) {
          entities.push(entity);
        }
        return false;
      },
      () => {}
    );
  });
  return entities;
};

const countByType = (obj: { getType: () => string }[]) => countBy(obj, x => x.getType());

const getBlockTypePlugins = (blocks: ContentBlock[]) =>
  blocks.filter(block => block.getType() !== 'unstyled' && block.getType() !== 'atomic');

export function getPostContentSummary(editorState: EditorState) {
  if (Object.entries(editorState).length === 0) return;
  const blocks = editorState.getCurrentContent().getBlocksAsArray();
  const entries = getEntities(editorState);
  const blockPlugins = getBlockTypePlugins(blocks);
  const pluginsDetails = entries
    .filter(entry => entry.getType() !== 'text')
    .map(entry => ({ type: entry.getType(), data: entry.getData() }));
  return {
    pluginsCount: {
      ...countByType(blockPlugins),
      ...countByType(entries),
    },
    pluginsDetails,
  };
}

//ATM, it only looks for deleted plugins.
//onChanges - for phase 2?
//Added Plugins - checked elsewhere via toolbar clicks
export const createCalcContentDiff = (editorState: EditorState) => {
  let prevState = editorState;
  return debounce((newState, { shouldCalculate, onCallbacks }) => {
    if (!shouldCalculate) return;
    const countByType = obj => countBy(obj, x => x.type);
    const prevEntities = countByType(getEntities(prevState));
    const currEntities = countByType(getEntities(newState));
    const prevBlocks = prevState.getCurrentContent().getBlocksAsArray();
    const currBlocks = newState.getCurrentContent().getBlocksAsArray();
    const prevBlockPlugins = countByType(getBlockTypePlugins(prevBlocks));
    const currBlockPlugins = countByType(getBlockTypePlugins(currBlocks));

    const prevPluginsTotal = Object.assign(prevEntities, prevBlockPlugins);
    const currPluginsTotal = Object.assign(currEntities, currBlockPlugins);

    const pluginsDeleted: string[] = [];
    Object.keys(prevPluginsTotal)
      .filter(type => type !== 'undefined')
      .forEach(type => {
        const deletedCount = prevPluginsTotal[type] - (currPluginsTotal[type] || 0);
        times(deletedCount, () => pluginsDeleted.push(type));
      });

    onCallbacks({ pluginsDeleted });
    prevState = newState;
  }, 300);
};

// a selection of the new content from the last change
function createLastChangeSelection(editorState: EditorState): SelectionState {
  const content = editorState.getCurrentContent();
  const selectionBefore = content.getSelectionBefore();
  return content.getSelectionAfter().merge({
    anchorKey: selectionBefore.getStartKey(),
    anchorOffset: selectionBefore.getStartOffset(),
  }) as SelectionState;
}

export function fixPastedLinks(
  editorState: EditorState,
  { anchorTarget, relValue }: { anchorTarget: string; relValue: string }
) {
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

export function getFocusedBlockKey(editorState: EditorState) {
  const selection = editorState.getSelection();
  return selection.isCollapsed() && selection.getAnchorKey();
}

export function getBlockInfo(editorState: EditorState, blockKey: string) {
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(blockKey);
  const entityKey = block.getEntityAt(0);
  const entity = entityKey ? contentState.getEntity(entityKey) : undefined;
  const entityData = entity?.getData();
  const type = entity?.getType();

  return { type: type || 'text', entityData };
}

export function getBlockType(editorState: EditorState) {
  const contentState = editorState.getCurrentContent();
  const blockKey = editorState.getSelection().getAnchorKey();
  const block = contentState.getBlockForKey(blockKey);
  return block.getType();
}

export function setSelection(editorState: EditorState, selection: SelectionState) {
  return EditorState.acceptSelection(editorState, selection);
}

export const isTypeText = (blockType: string) => {
  return TEXT_TYPES.some(type => type === blockType);
};

export function indentSelectedBlocks(editorState: EditorState, adjustment: number) {
  const maxDepth = 4;
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const startKey = selection.getStartKey();
  const endKey = selection.getEndKey();
  const blockMap = contentState.getBlockMap();

  const adjustBlockDepth = (block: ContentBlock, adjustment: number): ContentBlock => {
    let depth = block.getDepth() + adjustment;
    depth = Math.max(0, Math.min(depth, maxDepth));
    return block.set('depth', depth) as ContentBlock;
  };

  const getBlocks = () =>
    blockMap
      .toSeq()
      .skipUntil((_, k) => k === startKey)
      .takeUntil((_, k) => k === endKey)
      .concat([[endKey, blockMap.get(endKey)]]);

  const blocks = getBlocks()
    .filter(block => !!block && isTypeText(block.getType()))
    .map(block => !!block && adjustBlockDepth(block, adjustment)) as ContentBlock;

  const withAdjustment = contentState.merge({
    blockMap: blockMap.merge(blocks),
    selectionBefore: selection,
    selectionAfter: selection,
  }) as ContentState;
  return EditorState.push(editorState, withAdjustment, 'adjust-depth');
}

export function setForceSelection(editorState: EditorState, selection: SelectionState) {
  return EditorState.forceSelection(editorState, selection);
}

export function insertString(editorState: EditorState, string: string) {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const newContentState = Modifier.replaceText(contentState, selectionState, string);
  return EditorState.push(editorState, newContentState, 'insert-string' as EditorChangeType);
}

export function getCharacterBeforeSelection(editorState: EditorState) {
  let character;
  const selectionState = editorState.getSelection();
  const start = selectionState.getStartOffset() - 1;

  if (start >= 0) {
    const anchorKey = selectionState.getAnchorKey();
    const contentState = editorState.getCurrentContent();
    const currentContentBlock = contentState.getBlockForKey(anchorKey);
    character = currentContentBlock.getText().slice(start, start + 1);
  }
  return character;
}

export function deleteCharacterBeforeCursor(editorState: EditorState) {
  let newState;
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();

  if (selectionState.isCollapsed()) {
    const start = selectionState.getStartOffset() - 1;
    const newSelection = selectionState.set('anchorOffset', start) as SelectionState;
    const newContentState = Modifier.replaceText(contentState, newSelection, '');
    newState = EditorState.push(editorState, newContentState, 'delete-string' as EditorChangeType);
  }
  return newState;
}
