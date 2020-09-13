import { PaletteColors, ThemeUtils } from 'wix-rich-content-common';

export default function editor(colors: PaletteColors, utils: ThemeUtils) {
  const adaptedActionColor = utils.adaptForeground(colors.actionColor);
  const { bgColor, actionColor, textColor, secondaryColor } = colors;
  return {
    quote: {
      'border-left-color': actionColor,
      'border-right-color': actionColor,
    },
    sideToolbar_floatingContainer: {
      textAlign: 'start',
    },
    sideToolbar_floatingIcon: {
      fill: textColor,
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
    footerToolbarButton_wrapper: {
      '& $footerToolbarButton:hover:not([disabled]) $footerToolbarButton_icon': {
        color: actionColor,
      },
    },
    footerToolbarButton: {},
    //inline-toolbar-dropdown-button.scss
    inlineToolbarButton_active: {
      color: adaptedActionColor,
      fill: adaptedActionColor,
    },
    inlineToolbarDropdownButton: {
      '&:hover svg': {
        fill: adaptedActionColor,
      },
    },
    //static-toolbar-more-button.scss
    moreButton: {
      color: secondaryColor,
      '&:hover, &:focus': {
        color: actionColor,
      },
      '&.active': {
        color: actionColor,
      },
    },
  };
}
