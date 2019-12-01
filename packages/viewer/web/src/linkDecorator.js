import { getUrlMatches } from 'wix-rich-content-common';

export const LinkStrategy = (contentBlock, callback) => {
  const text = contentBlock.getText();
  if (!text) {
    return [];
  }

  const linkMatches = getUrlMatches(text);
  if (!linkMatches || linkMatches.length === 0) {
    return [];
  }

  linkMatches.forEach(({ index, lastIndex }) => {
    callback(index, lastIndex);
  });
};
