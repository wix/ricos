import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';
import values from 'lodash/values';
import { HEADING } from '../consts';

const INLINE_HEADING = {
  ONE: 'inline-header-one',
  TWO: 'inline-header-two',
  THREE: 'inline-header-three',
};
const INLINE_HEADINGS = values(INLINE_HEADING);

const stripWhitespace = text => text.replace(/\s/g, '');

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

const getHeadersText = (blockText, headerRanges) => {
  const processedRanges = [];
  return headerRanges.reduce((chars, { offset, length }) => {
    let adjustedOffset = offset;
    let adjustedLength = length;
    processedRanges.forEach(pr => {
      if (offset >= pr.offset && offset <= (pr.offset + pr.length)) {
        adjustedOffset = pr.length;
        adjustedLength -= offset;
      }
    });
    processedRanges.push({ offset: adjustedOffset, length: adjustedLength });
    return chars += blockText.substr(adjustedOffset, adjustedLength); //eslint-disable-line no-param-reassign
  }, '');
};

const getInlineHeaderBlockType = (blockText, headerRanges) => {
  let blockType = 'unstyled';
  const textLength = stripWhitespace(blockText).length;
  const headersText = getHeadersText(blockText, headerRanges);
  const headersLength = stripWhitespace(headersText).length;
  const containsOnlyHeaders = headersLength === textLength;
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
