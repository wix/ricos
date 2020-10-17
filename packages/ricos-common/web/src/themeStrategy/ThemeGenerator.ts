import { PaletteColors } from 'wix-rich-content-common';
import * as utils from './themeUtils';
import { presets, assertWixPalette, COLORS, isRicosPalette, getColorValue } from './palettes';
import { ThemeGeneratorFunction, RicosTheme } from './themeTypes';

const createCssVars = (colors: PaletteColors) => {
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

export default class ThemeGenerator {
  isViewer: boolean;
  themeGeneratorFunctions: ThemeGeneratorFunction[];
  palette?: PaletteColors;

  constructor(
    isViewer: boolean,
    palette?: RicosTheme['palette'],
    themeGeneratorFunctions: ThemeGeneratorFunction[] = []
  ) {
    this.setPalette(palette);
    this.themeGeneratorFunctions = themeGeneratorFunctions;
    this.isViewer = isViewer;
  }

  setPalette(palette?: RicosTheme['palette']) {
    if (!palette) return;
    if (typeof palette === 'string') {
      if (palette in presets) {
        this.palette = presets[palette];
      } else {
        throw Error(`Palette ${palette} is unknown. Supported themes: ${presets.toString()}`);
      }
    } else if (Array.isArray(palette)) {
      assertWixPalette(palette);
      this.palette = {
        actionColor: getColorValue(palette, COLORS.ACTION_COLOR),
        bgColor: getColorValue(palette, COLORS.BG_COLOR),
        textColor: getColorValue(palette, COLORS.TEXT_COLOR),
      };
    } else if (isRicosPalette(palette)) {
      this.palette = palette;
    }
  }

  getStylesString(): Record<string, unknown> {
    if (!this.palette) {
      return {};
    }
    const colors = this.palette;
    this.themeGeneratorFunctions.forEach(themeGen => themeGen(colors, utils));
    return createCssVars(colors);
  }
}
