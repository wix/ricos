import * as utils from './themes/utils';
import getEditorCommonTheme from './themes/editor-common';
import getEditorTheme from './themes/editor';
import getViewerTheme from './themes/viewer';
import getCommonStyles from './themes/common';

/* eslint-disable camelcase */
const THEMES = {
  DEFAULT: 'Default',
  BACK_OFFICE: 'BackOffice',
  PALETTE: 'Palette',
};

const SUPPORTED_THEMES = [THEMES.DEFAULT, THEMES.PALETTE];
const BG_COLOR = 11;
const SECONDARY_COLOR = 13;
const COLOR4 = 14;
const TEXT_COLOR = 15;
const ACTION_COLOR = 18;
const COLOR7 = 17;

export default class ThemeGenerator {
  isEditor: boolean;
  themeGenerators: ThemeGeneratorFunction[];
  _theme: string;
  palette: Palette;

  constructor(
    isEditor: boolean,
    { theme = THEMES.DEFAULT, palette, themeGenerators = [] }: StringThemeProperties
  ) {
    this.setTheme(theme, palette);
    this.themeGenerators = themeGenerators;
    this.isEditor = isEditor;
  }

  setTheme(theme: string, palette?: Palette) {
    if (SUPPORTED_THEMES.indexOf(theme) === -1) this._theme = THEMES.DEFAULT;
    else this._theme = theme;

    if (theme === THEMES.PALETTE) {
      if (!palette) throw Error('Invalid palette');
      else this.palette = palette;
    }
  }

  getColorByCode(code: number): Color {
    const idx = code <= 5 ? code - 1 : code - 6;
    return this.palette[idx];
  }

  getColorValue(code: number): string {
    return this.getColorByCode(code).value;
  }

  getStylesObject() {
    if (this._theme === THEMES.DEFAULT) {
      return {};
    } else {
      const colors = {
        actionColor: this.getColorValue(ACTION_COLOR),
        bgColor: this.getColorValue(BG_COLOR),
        textColor: this.getColorValue(TEXT_COLOR),
        secondaryColor: this.getColorValue(SECONDARY_COLOR),
        color7: utils.hexToRgbA(this.getColorValue(COLOR7), 0.7),
        color4: this.getColorValue(COLOR4),
      };

      const pluginThemes = this.themeGenerators.reduce(
        (acc, curr) => ({
          ...acc,
          ...curr(colors, utils),
        }),
        {}
      );

      const appStyles = (this.isEditor && {
        ...getEditorCommonTheme(colors),
        ...getEditorTheme(colors, utils),
      }) || {
        ...getViewerTheme(colors),
      };

      return {
        ...getCommonStyles(colors),
        ...appStyles,
        ...pluginThemes,
      };
    }
  }
}

export { THEMES };
