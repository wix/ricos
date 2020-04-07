/* eslint-disable camelcase */
export default function editor(colors, utils) {
  const adaptedActionColor = utils.adaptForeground(colors.actionColor);
  const { bgColor, actionColor, textColor } = colors;
  return {
    editor: {
      background: bgColor,
      color: textColor,
    },
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
      background: `${bgColor} !important`,
    },
    footerToolbarButton_icon: {
      color: textColor,
    },
    footerToolbarButton: {
      '&:hover:not([disabled]) $footerToolbarButton_icon': {
        color: adaptedActionColor,
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
