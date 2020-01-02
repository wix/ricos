import * as Themes from './themes';

const SUPPORTED_THEMES = [Themes.DEFAULT, Themes.PALETTE, Themes.BACK_OFFICE];
const BG_COLOR = 11;
const TEXT_COLOR = 15;
const ACTION_COLOR = 18;

export default class RceTheme {
  constructor(theme, palette) {
    this.setTheme(theme, palette);
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
      return {
        hashtag: {
          color: actionColor,
        },
        editor: {
          background: bgColor,
          color: textColor,
        },
        divider: {
          strokeWidth: '12px',
          color: this.getColorValue(28),
        },
      };
    }
  }
}

export { Themes };
