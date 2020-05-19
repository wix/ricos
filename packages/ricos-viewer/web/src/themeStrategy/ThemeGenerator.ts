import * as utils from './themes/utils';
import getEditorCommonTheme from './themes/editor-common';
import getEditorTheme from './themes/editor';
import getViewerTheme from './themes/viewer';
import getCommonStyles from './themes/common';
import { merge } from 'lodash';

/* eslint-disable camelcase */
const PRESETS = {
  BACK_OFFICE: 'BackOffice',
};

const PALETTES: PalettePresets = { BackOffice: [], DarkTheme: [] }; //we should add BackOffice when ready
const BG_COLOR = 11;
const SECONDARY_COLOR = 13;
const COLOR4 = 14;
const TEXT_COLOR = 15;
const ACTION_COLOR = 18;
const COLOR7 = 17;

export default class ThemeGenerator {
  isViewer: boolean;
  themeGenerators: ThemeGeneratorFunction[];
  palette: Palette;

  constructor(isViewer: boolean, { palette = 'Default', themeGenerators = [] }: ThemeProperties) {
    this.setPalette(palette);
    this.themeGenerators = themeGenerators;
    this.isViewer = isViewer;
  }

  setPalette(palette: string | Palette) {
    if (typeof palette === 'string') {
      if (!PALETTES[palette]) {
        throw Error(`Palette ${palette} is unknown. Supported themes: ${PALETTES.toString()}`);
      } else {
        this.palette = PALETTES[palette];
      }
    } else {
      this.palette = palette;
    }
  }

  getColorByCode(code: number): Color {
    const idx = code <= 5 ? code - 1 : code - 6;
    if (!this.palette) throw Error('Palette instance was not set');
    return this.palette[idx];
  }

  getColorValue(code: number): string {
    return this.getColorByCode(code).value;
  }

  getStylesObject() {
    if (!this.palette) {
      return {};
    }
    const colors = {
      actionColor: this.getColorValue(ACTION_COLOR),
      bgColor: this.getColorValue(BG_COLOR),
      textColor: this.getColorValue(TEXT_COLOR),
      secondaryColor: this.getColorValue(SECONDARY_COLOR),
      color7: utils.hexToRgbA(this.getColorValue(COLOR7), 0.7),
      color4: this.getColorValue(COLOR4),
    };

    const pluginThemes = this.themeGenerators.map(themeGen => themeGen(colors, utils));
    const appStyles = !this.isViewer
      ? merge(getEditorCommonTheme(colors), getEditorTheme(colors, utils))
      : getViewerTheme(colors);

    return merge(getCommonStyles(colors), appStyles, ...pluginThemes);
  }
}

export { PRESETS };
