import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';
import values from 'lodash/values';
import get from 'lodash/get';
import { HEADING } from '../consts';

const INLINE_HEADING = {
  ONE: 'inline-header-one',
  TWO: 'inline-header-two',
  THREE: 'inline-header-three',
};
const INLINE_HEADINGS = values(INLINE_HEADING);

const containsHeaderType = (headerRanges, headerType) =>
  headerRanges.some(({ style }) => style === headerType);

const getInlineStyleRanges = block => {
  const { inlineStyleRanges } = block;
  if (inlineStyleRanges) {
    const headerRanges = inlineStyleRanges.filter(({ style }) => includes(INLINE_HEADINGS, style));
    const otherRanges = inlineStyleRanges.filter(({ style }) => !includes(INLINE_HEADINGS, style));
    return { headerRanges, otherRanges };
  }

  return { headerRanges: [], otherRanges: [] };
};

const getHeadersLength = headerRanges => {
  let previousHeader = {};
  return headerRanges.reduce((headerLength, { offset, length }) => {
    let additionalLength = 0;
    if (offset !== get(previousHeader, 'offset', -1)) {
      additionalLength = length;
    } else {
      additionalLength = Math.abs(previousHeader.length - length);
    }
    previousHeader = { offset, length };
    return headerLength += additionalLength; //eslint-disable-line no-param-reassign
  }, 0);
};

const getInlineHeaderBlockType = (blockText, headerRanges) => {
  let blockType = 'unstyled';
  const headersLength = getHeadersLength(headerRanges);
  const containsOnlyHeaders = headersLength === blockText.length;
  if (containsOnlyHeaders) {
    if (containsHeaderType(headerRanges, INLINE_HEADING.THREE)) {
      blockType = HEADING.THREE;
    } else if (containsHeaderType(headerRanges, INLINE_HEADING.TWO)) {
      blockType = HEADING.TWO;
    } else {
      blockType = HEADING.ONE;
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
    return {
      ...block,
      type: getInlineHeaderBlockType(block.text, headerRanges),
      inlineStyleRanges,
    };
  }
};
