import { PaletteColors } from 'wix-rich-content-common';
import * as utils from './themeUtils';
import { palettes, assertWixPalette, COLORS, isRicosPalette, getColorValue } from './palettes';
import { PalettePreset, ThemeGeneratorFunction, RicosTheme } from 'ricos-common';

/* eslint-disable camelcase */

const PALETTE_PRESETS: { [propName in PalettePreset]: PaletteColors } = {
  darkTheme: palettes.darkTheme,
};

const createCssVars = (colors: PaletteColors) => {
  const { adaptForeground, toRgbTuple, fallbackColorBright } = utils;
  const { textColor, bgColor, actionColor } = colors;
  return `
  * {
    --ricos-text-color: ${textColor};
    --ricos-text-color-tuple: ${toRgbTuple(textColor)};
    --ricos-action-color: ${actionColor};
    --ricos-action-color-tuple: ${toRgbTuple(actionColor)};
    --ricos-action-color-fallback: ${adaptForeground(actionColor)};
    --ricos-action-color-fallback-tuple: ${toRgbTuple(adaptForeground(actionColor))};
    --ricos-action-color-fallback-bright: ${fallbackColorBright};
    --ricos-action-color-fallback-bright-tuple: ${toRgbTuple(fallbackColorBright)};
    --ricos-background-color: ${bgColor};
    --ricos-background-color-tuple: ${toRgbTuple(bgColor)};
  }\n`;
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
      if (palette in PALETTE_PRESETS) {
        this.palette = PALETTE_PRESETS[palette];
      } else {
        throw Error(
          `Palette ${palette} is unknown. Supported themes: ${PALETTE_PRESETS.toString()}`
        );
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

  getStylesString() {
    if (!this.palette) {
      return '';
    }
    const colors = this.palette;
    this.themeGeneratorFunctions.forEach(themeGen => themeGen(colors, utils));
    return createCssVars(colors);
  }
}

export { PALETTE_PRESETS };
