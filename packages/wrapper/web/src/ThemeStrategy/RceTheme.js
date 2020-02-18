const Themes = {
  DEFAULT: 'Default',
  BACK_OFFICE: 'BackOffice',
  PALETTE: 'Palette',
};

const SUPPORTED_THEMES = [Themes.DEFAULT, Themes.PALETTE, Themes.BACK_OFFICE];
const BG_COLOR = 11;
const SECONDARY_COLOR = 13;
const TEXT_COLOR = 15;
const ACTION_COLOR = 18;

export default class RceTheme {
  constructor({ theme, palette, themeGenerators = [] }) {
    this.setTheme(theme, palette);
    this.themeGenerators = themeGenerators;
  }

  setTheme(theme, palette) {
    if (SUPPORTED_THEMES.indexOf(theme) === -1) {
      // eslint-disable-next-line no-console
      console.log(theme);
      // eslint-disable-next-line no-console
      console.error('Unknown theme: ', theme);
      this._theme = Themes.DEFAULT;
    } else {
      this._theme = theme;
    }

    if (theme === Themes.PALETTE || theme === Themes.BACK_OFFICE) {
      if (!palette) {
        throw Error('AAAArgh!');
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
    if (this._theme === Themes.DEFAULT) {
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

export { Themes };
