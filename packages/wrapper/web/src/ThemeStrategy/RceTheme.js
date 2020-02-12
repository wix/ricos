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

// const defaultStyles = {
//   hashtag: {
//     color: 'purple',
//   },
//   editor: {
//     background: 'red',
//     //color: 'red',
//   },
//   divider: {
//     //strokeWidth: '12px',
//     //color: 'red',
//   },
//   // footerToolbarButton: {
//   //   //footerToolbarButton_icon: {
//   //   ':hover': {
//   //     '&.footerToolbarButton_icon': {
//   //       color: 'red',
//   //     },
//   //   },
//   //   //},
//   // },
//   footerToolbarButton: {
//     ':hover': {
//       '& .footerToolbarButton_icon': {
//         color: 'red',
//       },
//     },
//     // },
//     //'&:hover .footerToolbarButton_icon': {
//     // color: 'red',
//     //},
//   },
// };
export default class RceTheme {
  constructor({ theme, palette, themeGenerators }) {
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
    // const pluginThemes = this.themeGenerators.reduce(
    //   (acc, themeGenerator) => ({ ...acc, ...themeGenerator(theme, palette) }),
    //   {}
    // );
    if (this._theme === Themes.DEFAULT) {
      return {};
    } else {
      const actionColor = this.getColorValue(ACTION_COLOR);
      const bgColor = this.getColorValue(BG_COLOR);
      const textColor = this.getColorValue(TEXT_COLOR);
      const secondaryColor = this.getColorValue(SECONDARY_COLOR);

      const pluginThemes = this.themeGenerators.reduce(
        (acc, curr) => ({
          ...acc,
          ...curr(this.palette),
        }),
        {}
      );

      const combinedTheme = Object.assign(
        {
          hashtag: {
            color: actionColor,
          },
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
        },
        pluginThemes
      );

      return combinedTheme;
      // action color:
      // hover on toolbar buttons
      // + button on the left
      //

      // bgcolor
      // rce text formatting toolbar (inline toolbar) - detach from background color (fixed white we want)

      // divider = text color
      // hashtag: actionColor
      // quoteblock: actionColor

      //palletes: 1 = background, 5 = text, 8 = actions
    }
  }
}

export { Themes };
