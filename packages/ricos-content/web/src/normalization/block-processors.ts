import { isEqual, uniqWith } from 'lodash';
import { RicosContentBlock, RicosInlineStyleRange } from '../types';

/**
 * fixAtomicBlockText
 * @description sets whitespace as atomic block text
 */
export const fixAtomicBlockText = (block: RicosContentBlock): RicosContentBlock =>
  block.type === 'atomic' ? { ...block, text: ' ' } : block;

/**
 * addInlineStyleRanges
 * @description ensures that block.inlineStyleRanges is defined ([] by default)
 */
export const addInlineStyleRanges = (block: RicosContentBlock): RicosContentBlock => ({
  ...block,
  inlineStyleRanges: block.inlineStyleRanges || [],
});

/**
 * fixLinkUnderlineRange
 * @description adds underline inline style ranges to links
 */
export const addLinkUnderlineRange = (
  block: RicosContentBlock,
  range: RicosInlineStyleRange
): RicosContentBlock => {
  const inlineStyleRange = {
    offset: range.offset,
    length: range.length,
    style: 'UNDERLINE',
  };

  const inlineStyleRanges = uniqWith(
    [...(block.inlineStyleRanges || []), inlineStyleRange],
    isEqual
  );

  return { ...block, inlineStyleRanges };
};
