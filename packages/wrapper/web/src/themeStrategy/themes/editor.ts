/* eslint-disable @typescript-eslint/camelcase */
export default function editor(colors: PaletteColors, utils: ThemeUtils) {
  const adaptedActionColor = utils.adaptForeground(colors.actionColor);
  const { bgColor, actionColor, textColor } = colors;
  return {
    quote: {
      'border-left-color': actionColor,
      'border-right-color': actionColor,
    },
    sideToolbar_floatingIcon: {
      '&:hover': {
        fill: actionColor,
      },
    },
    footerToolbar: {
      '&$staticToolbar': {
        background: bgColor,
      },
    },
    staticToolbar: {},
    footerToolbarButton_icon: {
      color: textColor,
    },
    footerToolbarButton: {
      '&:hover:not([disabled]) $footerToolbarButton_icon': {
        color: actionColor,
      },
    },
    //inline-toolbar-dropdown-button.scss
    inlineToolbarButton_active: {
      backgroundColor: `${adaptedActionColor} !important`,
      fill: `${adaptedActionColor} !important`,
    },
    inlineToolbarDropdownButton: {
      '&:hover svg': {
        fill: `${adaptedActionColor} !important`,
      },
    },
  };
}
