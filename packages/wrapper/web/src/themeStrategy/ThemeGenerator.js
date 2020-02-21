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

export default class ThemeGenerator {
  constructor(isEditor, { theme = THEMES.DEFAULT, palette, themeGenerators = [] }) {
    this.setTheme(theme, palette);
    this.themeGenerators = themeGenerators;
    this.isEditor = isEditor;
  }

  setTheme(theme, palette) {
    if (SUPPORTED_THEMES.indexOf(theme) === -1) {
      this._theme = THEMES.DEFAULT;
    } else {
      this._theme = theme;
    }

    if (theme === THEMES.PALETTE || theme === THEMES.BACK_OFFICE) {
      if (!palette) {
        throw Error('Invalid palette');
      } else {
        this.palette = palette;
      }
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
      const actionColor = this.getColorValue(ACTION_COLOR);
      const bgColor = this.getColorValue(BG_COLOR);
      const textColor = this.getColorValue(TEXT_COLOR);
      const secondaryColor = this.getColorValue(SECONDARY_COLOR);

      const colors = {
        actionColor,
        bgColor,
        textColor,
        secondaryColor,
      };

      const pluginThemes = this.themeGenerators.reduce(
        (acc, curr) => ({
          ...acc,
          ...curr(colors),
        }),
        {}
      );

      return {
        editor: {
          background: bgColor,
          color: textColor,
        },
        quote: {
          borderLeftColor: actionColor,
          borderRightColor: actionColor,
        },
        sideToolbar_floatingIcon: {
          ':hover': {
            fill: actionColor,
          },
        },
        linkPreview: {
          borderColor: textColor,
          backgroundColor: bgColor,
        },
        linkPreview_title: {
          color: textColor,
        },
        linkPreview_image: {
          borderColor: textColor,
        },
        linkPreview_description: {
          color: textColor,
        },
        linkPreview_url: {
          color: secondaryColor,
        },
        ...pluginThemes,
      };
    }
  }
}

export { THEMES };
