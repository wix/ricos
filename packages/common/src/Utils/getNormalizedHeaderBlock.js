import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';
import values from 'lodash/values';
import { HEADING } from '../consts';

const INLINE_HEADING = {
  ONE: 'inline-header-one',
  TWO: 'inline-header-two',
  THREE: 'inline-header-three',
};

const inlineToBlockHeaderTypeMap = {
  [INLINE_HEADING.ONE]: HEADING.ONE,
  [INLINE_HEADING.TWO]: HEADING.TWO,
  [INLINE_HEADING.THREE]: HEADING.THREE,
};


const getInlineStyleRanges = block => {
  const { inlineStyleRanges } = block;
  if (inlineStyleRanges) {
    const INLINE_HEADINGS = values(INLINE_HEADING);
    const headerRanges = inlineStyleRanges.filter(({ style }) => includes(INLINE_HEADINGS, style));
    const otherRanges = inlineStyleRanges.filter(({ style }) => !includes(INLINE_HEADINGS, style));
    return { headerRanges, otherRanges };
  }

  return { headerRanges: [], otherRanges: [] };
};

const getInlineHeaderBlockType = (blockText, headerRanges) => {
  let blockType = 'unstyled';
  if (headerRanges.length === 1) {
    const { length: headerLength, style: headerStyle } = headerRanges[0];
    if (headerLength === blockText.length) {
      blockType = inlineToBlockHeaderTypeMap[headerStyle];
    }
  } else {
    const headerLength = headerRanges.reduce((headerLength, { length }) => headerLength += length, 0); //eslint-disable-line no-param-reassign
    const containsOnlyHeaders = headerLength === blockText.length;
    if (containsOnlyHeaders) {
      if (headerRanges.some(({ style }) => style === INLINE_HEADING.THREE)) {
        blockType = HEADING.THREE;
      } else if (headerRanges.some(({ style }) => style === INLINE_HEADING.TWO)) {
        blockType = HEADING.TWO;
      } else {
        blockType = HEADING.ONE;
      }
    }
  }
  return blockType;
};

export const getNormalizedHeaderBlock = block => {
  const { headerRanges, otherRanges } = getInlineStyleRanges(block);
  const inlineStyleRanges = [...otherRanges];
  if (isEmpty(headerRanges)) {
    return block;
  } else {

    console.log(block.text, block.text.length, length); //eslint-disable-line
    return {
      ...block,
      type: getInlineHeaderBlockType(block.text, headerRanges),
      inlineStyleRanges,
    };
  }
};
