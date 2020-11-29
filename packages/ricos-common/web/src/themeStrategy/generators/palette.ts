import { PaletteColors, ThemeGeneratorFunction, RicosCustomStyles } from 'wix-rich-content-common';
import * as utils from '../themeUtils';
import { presets, assertWixPalette, COLORS, isRicosPalette, getColorValue } from '../palettes';
import { RicosTheme, CssVarsObject } from '../themeTypes';

const createCssVars = (colors: PaletteColors): CssVarsObject => {
  const { adaptForeground, toRgbTuple } = utils;
  const { textColor, bgColor: backgroundColor, actionColor } = colors;
  return {
    textColor,
    textColorTuple: toRgbTuple(textColor),
    actionColor,
    actionColorTuple: toRgbTuple(actionColor),
    actionColorFallback: adaptForeground(actionColor),
    actionColorFallbackTuple: toRgbTuple(adaptForeground(actionColor)),
    backgroundColor,
    backgroundColorTuple: toRgbTuple(backgroundColor),
  };
};

const extractColors = (palette: RicosTheme['palette']): PaletteColors => {
  if (typeof palette === 'string') {
    if (palette in presets) {
      return presets[palette];
    } else {
      throw Error(`Palette ${palette} is unknown. Supported themes: ${presets.toString()}`);
    }
  } else if (Array.isArray(palette)) {
    assertWixPalette(palette);
    return {
      actionColor: getColorValue(palette, COLORS.ACTION_COLOR),
      bgColor: getColorValue(palette, COLORS.BG_COLOR),
      textColor: getColorValue(palette, COLORS.TEXT_COLOR),
    };
  } else if (palette && isRicosPalette(palette)) {
    return palette;
  }
  throw Error('Unrecognized Palette object. Please refer to Ricos Theme Documentation');
};

export default function createPalette(
  palette?: RicosTheme['palette'],
  themeGeneratorFunctions: ThemeGeneratorFunction[] = [],
  customStyles: RicosCustomStyles = {}
): CssVarsObject {
  if (!palette) {
    return {};
  }
  const colors = extractColors(palette);
  Object.entries(colors).forEach(
    ([colorName, value]) => (colors[colorName] = utils.toHexFormat(value))
  );
  themeGeneratorFunctions.forEach(themeGen => themeGen(colors, utils, customStyles));
  return createCssVars(colors);
}
