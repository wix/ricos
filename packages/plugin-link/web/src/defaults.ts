import { PaletteColors } from 'wix-rich-content-common';

export const DEFAULTS = {
  config: { linkTypes: { anchor: true } },
};
export const theme = (colors: PaletteColors) => ({
  link: {
    color: colors.actionColor,
    textDecoration: 'none',
  },
  toolbarUrl: {
    color: colors.actionColor,
  },
});
