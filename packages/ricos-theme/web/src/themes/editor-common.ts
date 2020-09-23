/* eslint-disable max-len */
import { adaptForeground, toCssRgbA } from './utils';
import { PaletteColors } from 'wix-rich-content-common';

export default function editorCommon(colors: PaletteColors) {
  const actionColor = adaptForeground(colors.actionColor);
  const toolbarButtonStyle = {
    color: actionColor,
    fill: actionColor,
  };
  return {
    //side-toolbar.scss + toolbar-button.scss
    //editor + editor-common
    buttonsWrapper: {
      '& $buttonWrapper:hover button:not([disabled]) svg': toolbarButtonStyle,
      '& $buttonWrapper:focus button:not([disabled]) svg': toolbarButtonStyle,
      '& $buttonWrapper:hover label:not([disabled]) svg': toolbarButtonStyle,
      '& $buttonWrapper:focus label:not([disabled]) svg': toolbarButtonStyle,
    },
    buttonWrapper: {
      //plugin-toolbar-button.scss
      '& $pluginToolbarButton:not($pluginToolbarButton_disabled)$pluginToolbarButton_active': toolbarButtonStyle,
      '& $pluginToolbarButton:not($pluginToolbarButton_disabled):focus svg': toolbarButtonStyle,
      '& $pluginToolbarButton:not($pluginToolbarButton_disabled):hover': toolbarButtonStyle,
    },

    //side-toolbar-panel.scss
    section: {},
    sideToolbarPanelWrapper: {
      '& $section $buttonsWrapper $buttonWrapper:hover': {
        backgroundColor: toCssRgbA(actionColor, 0.05),
      },
      '& $section $buttonsWrapper $buttonWrapper:hover button:not([disabled]) span': {
        color: actionColor,
      },
    },

    //inline-toolbar-button.scss
    inlineToolbarButton_active: {
      color: actionColor,
    },
    inlineToolbarButton_icon: {
      '&:hover': {
        color: actionColor,
        '& svg': {
          fill: actionColor,
        },
      },
    },
    inlineToolbarButton_wrapper: {
      '&:hover button': {
        backgroundColor: toCssRgbA(actionColor, 0.05),
      },
      '&:hover $inlineToolbarButton_icon': toolbarButtonStyle,
      '&:hover $inlineToolbarButton_icon svg': toolbarButtonStyle,
      '&:hover $inlineToolbarDropdownButton_icon svg': toolbarButtonStyle,
      '&$inlineToolbarButton_active button': {
        backgroundColor: toCssRgbA(actionColor, 0.1),
      },
    },

    //inline-toolbar-dropdown-button.scss
    inlineToolbarDropdown_wrapper: {
      '&:hover $inlineToolbarDropdownButton_active svg': toolbarButtonStyle,
      '&:hover>div:not($inlineToolbarDropdown_options) button': {
        backgroundColor: toCssRgbA(actionColor, 0.05),
      },
      '&:hover>div:not($inlineToolbarDropdown_options) button svg': toolbarButtonStyle,
      '&>div:not($inlineToolbarDropdown_options) $inlineToolbarDropdownButton_active': {
        backgroundColor: toCssRgbA(actionColor, 0.05),
      },
    },
    inlineToolbarDropdownButton_active: {
      '& svg': toolbarButtonStyle,
    },
    inlineToolbarDropdownButton_icon: {},
    inlineToolbarDropdown_options: {},

    //plugin-toolbar-button.scss
    pluginToolbarButton_disabled: {},
    pluginToolbarButton_active: {},
    pluginToolbarButton: {
      '&:not($pluginToolbarButton_disabled):hover >:not($Dropdown-root) svg': {
        fill: actionColor,
      },
    },
  };
}
