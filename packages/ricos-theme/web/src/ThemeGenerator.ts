import { PaletteColors } from 'wix-rich-content-common';
import * as utils from './themes/utils';
import { palettes, assertPalette, COLORS } from './palettes';
import getEditorCommonTheme from './themes/editor-common';
import getEditorTheme from './themes/editor';
import getViewerTheme from './themes/viewer';
import { merge } from 'lodash';
import { PalettePreset, Palette, Color, ThemeGeneratorFunction } from 'ricos-common';

/* eslint-disable camelcase */

const PALETTE_PRESETS: { [propName in PalettePreset]: Palette } = { darkTheme: palettes.darkTheme };

const getColorByCode = (palette: Palette, code: number): Color => {
  const idx = code <= 5 ? code - 1 : code - 6;
  return palette[idx];
};

const getColorValue = (palette: Palette, code: number): string =>
  getColorByCode(palette, code).value;

const createCssVars = (colors: PaletteColors) => `
* {
  --ricos-text-color: ${colors.textColor};
  --ricos-action-color: ${colors.actionColor};
  --ricos-background-color: ${colors.bgColor};
}\n`;

export default class ThemeGenerator {
  isViewer: boolean;
  themeGeneratorFunctions: ThemeGeneratorFunction[];
  palette?: Palette;

  constructor(
    isViewer: boolean,
    palette?: Palette | PalettePreset,
    themeGeneratorFunctions: ThemeGeneratorFunction[] = []
  ) {
    this.setPalette(palette);
    this.themeGeneratorFunctions = themeGeneratorFunctions;
    this.isViewer = isViewer;
  }

  setPalette(palette?: string | Palette) {
    if (typeof palette === 'string') {
      if (palette in PALETTE_PRESETS) {
        this.palette = PALETTE_PRESETS[palette];
      } else {
        throw Error(
          `Palette ${palette} is unknown. Supported themes: ${PALETTE_PRESETS.toString()}`
        );
      }
    } else {
      assertPalette(palette);
      this.palette = palette;
    }
  }

  getStylesObject() {
    if (!this.palette) {
      return {
        cssVars: '',
        jssStyleSheet: {},
      };
    }
    const colors: PaletteColors = {
      actionColor: getColorValue(this.palette, COLORS.ACTION_COLOR),
      bgColor: getColorValue(this.palette, COLORS.BG_COLOR),
      textColor: getColorValue(this.palette, COLORS.TEXT_COLOR),
    };

    const pluginThemes = this.themeGeneratorFunctions.map(themeGen => themeGen(colors, utils));
    const appStyles = !this.isViewer
      ? merge(getEditorCommonTheme(colors), getEditorTheme(colors, utils))
      : getViewerTheme(colors, utils);

    return {
      cssVars: createCssVars(colors),
      jssStyleSheet: merge(appStyles, ...pluginThemes),
    };
  }
}

export { PALETTE_PRESETS };
