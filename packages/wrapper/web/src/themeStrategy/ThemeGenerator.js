import * as utils from './themes/utils';
import editorCommon from './themes/editor-common';
import editor from './themes/editor';
import viewer from './themes/viewer';

/* eslint-disable camelcase */
const THEMES = {
  DEFAULT: 'Default',
  BACK_OFFICE: 'BackOffice',
  PALETTE: 'Palette',
};

const SUPPORTED_THEMES = [THEMES.DEFAULT, THEMES.PALETTE, THEMES.BACK_OFFICE];
const BG_COLOR = 11;
const SECONDARY_COLOR = 13;
const TEXT_COLOR = 15;
const ACTION_COLOR = 18;
const COLOR7 = 17;

export default class ThemeGenerator {
  constructor(isEditor, { theme = THEMES.DEFAULT, palette, themeGenerators = [] }) {
    this.setTheme(theme, palette);
    this.themeGenerators = themeGenerators;
    this.isEditor = isEditor;
  }

  setTheme(theme, palette) {
    if (SUPPORTED_THEMES.indexOf(theme) === -1) this._theme = THEMES.DEFAULT;
    else this._theme = theme;

    if (theme === THEMES.PALETTE || theme === THEMES.BACK_OFFICE) {
      if (!palette) throw Error('Invalid palette');
      else this.palette = palette;
    }
  }

  getColorByName(num) {
    const idx = num <= 5 ? num - 1 : num - 6;
    return this.palette[idx];
  }

  getColorValue(name) {
    return this.getColorByName(name).value;
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
      };

      const pluginThemes = this.themeGenerators.reduce(
        (acc, curr) => ({
          ...acc,
          ...curr(colors, utils),
        }),
        {}
      );

      const appStyles = (this.isEditor && {
        ...editorCommon(colors),
        ...editor(colors),
      }) || {
        ...viewer(colors),
      };

      return {
        ...appStyles,
        ...pluginThemes,
      };
    }
  }
}

export { THEMES };
