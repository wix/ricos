import { PaletteColors, ThemeUtils } from 'wix-rich-content-common';
import { COLORS } from './consts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WRAPPER_PALETTE: any = {};
export const getColors = () => ({ ...COLORS, ...WRAPPER_PALETTE });

export const theme = (colors: PaletteColors, utils: ThemeUtils) => {
  const { textColor, bgColor, actionColor } = colors;
  WRAPPER_PALETTE.color1 = bgColor;
  WRAPPER_PALETTE.color5 = textColor;
  WRAPPER_PALETTE.color7 = utils.toCssRgbA(actionColor, 0.06);
  WRAPPER_PALETTE.color8 = actionColor;
};

export const DEFAULTS = Object.freeze({
  config: {},
});
