import { PaletteColors, ThemeUtils } from 'wix-rich-content-common';

export default function editor(colors: PaletteColors, utils: ThemeUtils) {
  const adaptedActionColor = utils.adaptForeground(colors.actionColor);
  const { bgColor, actionColor, textColor } = colors;
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
      color: utils.toCssRgbA(textColor, 0.6),
      '&:hover, &:focus': {
        color: actionColor,
      },
      '&.active': {
        color: actionColor,
      },
    },

    // resizeable.rtlignore.scss
    resizeHandleL: {},
    resizeHandleR: {},
    editor: {
      '& $resizeHandleL:after, $resizeHandleR:before': {
        borderColor: actionColor,
      },
    },
  };
}
