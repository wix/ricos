export const DEFAULTS = {
  config: { linkTypes: { anchor: true } },
};
export const THEME = colors => ({
  link: {
    color: colors.actionColor,
    textDecoration: 'none',
  },
  toolbarUrl: {
    color: colors.actionColor,
  },
});
