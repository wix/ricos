import { getUrlMatches } from 'wix-rich-content-common';

export const LinkParseStrategy = (contentBlock, callback) => {
  const text = contentBlock.getText();
  if (!text) {
    return [];
  }

  let linkMatches = getUrlMatches(text);
  if (!linkMatches || linkMatches.length === 0) {
    return [];
  }

  // NOTE: this code assumes that if there's an entity range that perfectly matches the parsed link range =>
  // this entity range is LINK typed range, and it should be ignored by this decorator. Currently, there's no way
  // to get the actual range type within this decorator.
  if (contentBlock.entityRanges) {
    contentBlock.entityRanges.forEach(({ offset, length }) => {
      const entityRangeStart = offset;
      const entityRangeEnd = offset + length;
      linkMatches = linkMatches.filter(
        ({ index, lastIndex }) => !(index === entityRangeStart && lastIndex === entityRangeEnd)
      );
    });
  }

  linkMatches.forEach(({ index, lastIndex }) => {
    callback(index, lastIndex);
  });
};
