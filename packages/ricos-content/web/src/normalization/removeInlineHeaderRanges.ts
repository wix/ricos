import { initial, includes, intersection, isEmpty, last, negate, sortBy } from 'lodash';
import { HEADER_BLOCK } from '../consts';
import { RicosContentBlock, RicosInlineStyleRange, NormalizationProcessor } from '../types';

const INLINE_HEADER = {
  ONE: 'inline-header-one',
  TWO: 'inline-header-two',
  THREE: 'inline-header-three',
  FOUR: 'inline-header-four',
  FIVE: 'inline-header-five',
  SIX: 'inline-header-six',
};
const INLINE_HEADERS = [INLINE_HEADER.THREE, INLINE_HEADER.TWO, INLINE_HEADER.ONE];
const INLINE_HEADER_TO_BLOCK = {
  [INLINE_HEADER.ONE]: HEADER_BLOCK.ONE,
  [INLINE_HEADER.TWO]: HEADER_BLOCK.TWO,
  [INLINE_HEADER.THREE]: HEADER_BLOCK.THREE,
  [INLINE_HEADER.FOUR]: HEADER_BLOCK.FOUR,
  [INLINE_HEADER.FIVE]: HEADER_BLOCK.FIVE,
  [INLINE_HEADER.SIX]: HEADER_BLOCK.SIX,
};

/**
 * Removes inline headers from a given block.
 *
 * If 'unstyled' block contains only inline headers and spaces (no plain text),
 * it's type is changed to the smallest header block. E.g.: Block with inline-header-one
 * & inline-header-two will be converted to header-two block.
 */
export const removeInlineHeaderRanges: NormalizationProcessor<RicosContentBlock> = block => {
  const inlineHeaderRanges = getInlineHeaderRanges(block.inlineStyleRanges || []);
  if (isEmpty(inlineHeaderRanges)) {
    return block;
  }

  return {
    ...block,
    type: getBlockType(block.type, block.text, inlineHeaderRanges),
    inlineStyleRanges: omitInlineHeaderRanges(block.inlineStyleRanges || []),
  };
};

const isInlineHeaderRange = (range: RicosInlineStyleRange) => includes(INLINE_HEADERS, range.style);
const omitInlineHeaderRanges = (ranges: RicosInlineStyleRange[]) =>
  ranges.filter(negate(isInlineHeaderRange));
const getInlineHeaderRanges = (ranges: RicosInlineStyleRange[]) =>
  ranges.filter(isInlineHeaderRange);

const getBlockType = (
  type: RicosContentBlock['type'],
  text: RicosContentBlock['text'],
  inlineHeaderRanges: RicosInlineStyleRange[]
) =>
  type === 'unstyled' && shouldConvertToHeaderBlock(text, inlineHeaderRanges)
    ? getBlockHeaderType(inlineHeaderRanges)
    : type;

const shouldConvertToHeaderBlock = (
  text: RicosContentBlock['text'],
  inlineStyleRanges: RicosContentBlock['inlineStyleRanges']
) =>
  sortBy(inlineStyleRanges, 'offset')
    .map(range => [range.offset, range.offset + range.length])
    .reduce((ranges: number[][], range: number[]) => {
      const lastRange = last(ranges);
      return lastRange && isOverlapping(lastRange, range)
        ? [...initial(ranges), mergeOverlappingRanges(lastRange, range)]
        : [...ranges, range];
    }, [])
    .reverse()
    .reduce((text, range) => `${text.slice(0, range[0])}${text.slice(range[1])}`, text)
    .replace(/\s/g, '').length === 0;

const isInRange = (number: number, range: number[]) => range[0] <= number && number <= range[1];
const isOverlapping = (rangeA: number[], rangeB: number[]) =>
  rangeA && rangeB && (isInRange(rangeB[0], rangeA) || isInRange(rangeB[1], rangeA));
const mergeOverlappingRanges = (rangeA: number[], rangeB: number[]) => [
  Math.min(rangeA[0], rangeB[0]),
  Math.max(rangeA[1], rangeB[1]),
];

const getBlockHeaderType = (inlineHeaderRanges: RicosInlineStyleRange[]) => {
  const smallestInlineHeader = intersection(
    INLINE_HEADERS,
    inlineHeaderRanges.map(range => range.style)
  )[0];
  return INLINE_HEADER_TO_BLOCK[smallestInlineHeader];
};
