import { PaletteColors } from 'wix-rich-content-common';

export const DEFAULTS = {
  config: {
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
    onClick: event => {
      event.preventDefault();
    },
  },
};
export const THEME = (colors: PaletteColors) => ({
  hashtag: {
    color: colors.actionColor,
  },
});
