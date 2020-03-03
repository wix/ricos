export const DEFAULTS = {
  config: {
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
    onClick: event => {
      event.preventDefault();
    },
  },
};
export const THEME = colors => ({
  hashtag: {
    color: colors.actionColor,
  },
});
