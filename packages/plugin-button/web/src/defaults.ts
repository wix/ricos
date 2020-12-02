import { PaletteColors, RicosCustomStyles, ThemeUtils } from 'wix-rich-content-common';
import { DEFAULT_CONFIG, COLORS } from './constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WRAPPER_PALETTE: any = {};
export const DEFAULT_PALETTE = ['#FFFFFF', '#D5D4D4', '#000000', '#ABCAFF', '#81B0FF', '#0261FF'];
export const getColors = () => ({ ...COLORS, ...WRAPPER_PALETTE });
export const getDefaultComponentData = (rel, target) => {
  return {
    config: DEFAULT_CONFIG,
    button: {
      settings: {
        buttonText: 'Click Me',
        url: '',
        rel,
        target,
      },
      design: {
        activeButton: 0,
        borderRadius: 0,
        borderWidth: 0,
        padding: 12,
        background: getColors().color8,
        color: getColors().color1,
        borderColor: getColors().color8,
      },
    },
  };
};

export const theme = (
  colors: PaletteColors,
  utils: ThemeUtils,
  customStyles: RicosCustomStyles = {}
) => {
  const { textColor, bgColor, actionColor } = colors;
  const { isBright, fallbackColor, fallbackColorBright } = utils;
  const buttonColor = customStyles.button?.color || actionColor;
  //Button Designs Palette
  WRAPPER_PALETTE.color1 = bgColor;
  WRAPPER_PALETTE.color5 = textColor;
  WRAPPER_PALETTE.color7 = utils.toCssRgbA(buttonColor, 0.06);
  WRAPPER_PALETTE.color8 = buttonColor;

  //Color Picker Palette
  const isBgColorBright = isBright(bgColor);
  DEFAULT_PALETTE[0] = isBgColorBright ? bgColor : buttonColor;
  DEFAULT_PALETTE[1] = utils.toCssRgbA(textColor, 0.6);
  DEFAULT_PALETTE[2] = isBgColorBright ? buttonColor : bgColor;
  DEFAULT_PALETTE.splice(3, 3);
  if (DEFAULT_PALETTE[0].toLowerCase() !== fallbackColorBright)
    DEFAULT_PALETTE.unshift(fallbackColorBright);
  if (DEFAULT_PALETTE[DEFAULT_PALETTE.length - 1] !== fallbackColor)
    DEFAULT_PALETTE.push(fallbackColor);
};
