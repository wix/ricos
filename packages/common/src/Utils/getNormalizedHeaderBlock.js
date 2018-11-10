import { HEADING } from '../Decorators/inline-styles';

const blockToInlineHeaderTypeMap = {
  'header-two': 'inline-header-two',
  'header-three': 'inline-header-three',
};

const getInlineStyleRanges = block => {
  if (block.inlineStyleRanges) {
    const headerRanges = block.inlineStyleRanges.filter(({ style }) => style === HEADING.TWO || style === HEADING.THREE);
    const otherRanges = block.inlineStyleRanges.filter(({ style }) => style !== HEADING.TWO && style !== HEADING.THREE);
    return { headerRanges, otherRanges };
  }

  return { headerRanges: [], otherRanges: [] };

};

const getCombinedRanges = (wrapRange, innerRanges) => {
  if (innerRanges.length === 0) {
    return [wrapRange];
  }

  const combined = innerRanges.reduce((combinedRanges, range) => {
    // prepend the wrap range portion if the first inner range offset > 0
    if (combinedRanges.length === 0 && range.offset > 0) {
      combinedRanges.push({ ...wrapRange, length: range.offset - 1 });
    } else if (combinedRanges.length > 0) {
      const lastCombined = combinedRanges[combinedRanges.length - 1];
      const lastCombinedEnd = lastCombined.offset + lastCombined.length + 1;
      // insert the wrap range portion into the gap between last combined range and next inner range
      if (lastCombinedEnd < range.offset) {
        combinedRanges.push({ ...wrapRange, offset: lastCombinedEnd, length: range.offset - lastCombinedEnd - 1 });
      }
    }
    combinedRanges.push(range);
    return combinedRanges;
  }, []);

  // append the wrap range portion into the gap between last combined range and wrap range end
  if (combined.length > 0) {
    const lastCombined = combined[combined.length - 1];
    const lastCombinedEnd = lastCombined.offset + lastCombined.length;
    if (lastCombinedEnd < wrapRange.length) {
      combined.push({ ...wrapRange, offset: lastCombinedEnd, length: wrapRange.length - lastCombinedEnd });
    }
  }

  return combined;
};

export const getNormalizedHeaderBlock = block => {
  const existingInlineRanges = getInlineStyleRanges(block);
  const inlineStyleRanges = [...existingInlineRanges.otherRanges];
  const wrapRange = {
    offset: 0,
    length: block.text.length,
    style: blockToInlineHeaderTypeMap[block.type],
  };
  inlineStyleRanges.push(...getCombinedRanges(wrapRange, existingInlineRanges.headerRanges));

  return { ...block, type: 'unstyled', inlineStyleRanges };
};
