import * as utils from './themes/utils';
import getEditorCommonTheme from './themes/editor-common';
import getEditorTheme from './themes/editor';
import getViewerTheme from './themes/viewer';
import getCommonStyles from './themes/common';
import { merge } from 'lodash';

/* eslint-disable camelcase */

const PALETTE_PRESETS: { [propName in PalettePreset]: Palette } = { backOffice: [], darkTheme: [] };
const BG_COLOR = 11;
const SECONDARY_COLOR = 13;
const COLOR4 = 14;
const TEXT_COLOR = 15;
const ACTION_COLOR = 18;
const COLOR7 = 17;

const getColorByCode = (palette: Palette, code: number): Color => {
  const idx = code <= 5 ? code - 1 : code - 6;
  return palette[idx];
};

const getColorValue = (palette: Palette, code: number): string =>
  getColorByCode(palette, code).value;

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
      this.palette = palette;
    }
  }

  getStylesObject() {
    if (!this.palette) {
      return {};
    }
    const colors = {
      actionColor: getColorValue(this.palette, ACTION_COLOR),
      bgColor: getColorValue(this.palette, BG_COLOR),
      textColor: getColorValue(this.palette, TEXT_COLOR),
      secondaryColor: getColorValue(this.palette, SECONDARY_COLOR),
      color7: utils.hexToRgbA(getColorValue(this.palette, COLOR7), 0.7),
      color4: getColorValue(this.palette, COLOR4),
    };

    const pluginThemes = this.themeGeneratorFunctions.map(themeGen => themeGen(colors, utils));
    const appStyles = !this.isViewer
      ? merge(getEditorCommonTheme(colors), getEditorTheme(colors, utils))
      : getViewerTheme(colors);

    return merge(getCommonStyles(colors), appStyles, ...pluginThemes);
  }
}

export { PALETTE_PRESETS };
