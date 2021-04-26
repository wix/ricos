import { sortBy, isEqual, isEmpty } from 'lodash';
import { compare } from '../src/comparision/compare';

// compares ranges regardless style order, e.g. ['BOLD', 'ITALIC'] equals ['ITALIC', 'BOLD']
function areRangesEqual(blockRanges1, blockRanges2, sortKey) {
  return (
    blockRanges1.length === blockRanges2.length &&
    isEqual(
      sortBy(blockRanges1, r => r[sortKey]),
      sortBy(blockRanges2, r => r[sortKey])
    )
  );
}

function isTextAlignmentEqual(block1, block2) {
  const isBlock1AlignedLeft = !block1.data.textAlignment || block1.data.textAlignment === 'left';
  const isBlock2AlignedLeft = !block2.data.textAlignment || block2.data.textAlignment === 'left';
  return (
    isBlock1AlignedLeft === isBlock2AlignedLeft ||
    block1.data.textAlignment === block2.data.textAlignment
  );
}

function areBlockFieldsEqual(block1, block2) {
  return (
    block1.text === block2.text &&
    block1.depth === block2.depth &&
    block1.type === block2.type &&
    areRangesEqual(block1.inlineStyleRanges, block2.inlineStyleRanges, 'style') &&
    areRangesEqual(block1.entityRanges, block2.entityRanges, 'key') &&
    isTextAlignmentEqual(block1, block2) &&
    isEmpty(compare(block1.data, block2.data, { verbose: false, ignoredKeys: ['textAlignment'] }))
  );
}

function areBlocksEqual(currentStateBlocks, initialStateBlocks) {
  return (
    currentStateBlocks.length === initialStateBlocks.length &&
    currentStateBlocks.every((block, i) => areBlockFieldsEqual(block, initialStateBlocks[i]))
  );
}

export function isContentEqual(currContent, initialContent) {
  const blocksEqual = areBlocksEqual(currContent.blocks, initialContent.blocks);
  const entitiesEqual = isEmpty(
    compare(currContent.entityMap, initialContent.entityMap, { verbose: false })
  );
  return blocksEqual && entitiesEqual;
}
