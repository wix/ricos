/* eslint-disable max-len */
import { adaptForeground, toCssRgbA, fallbackColor } from './utils';
import { PaletteColors } from 'wix-rich-content-common';

export default function editorCommon(colors: PaletteColors) {
  const actionColor = adaptForeground(colors.actionColor);
  const toolbarButtonStyle = {
    color: actionColor,
    fill: actionColor,
  };
  const sliderTrack = { background: actionColor };
  const thumb = { ...sliderTrack, border: `4px solid ${actionColor}` };
  return {
    //checkbox.scss
    checkbox_wrapper: {
      '& $checkbox_icon': {
        border: `solid 1px ${actionColor}`,
      },
      '& $checkbox_icon:hover': {
        color: toCssRgbA(actionColor, 0.1),
      },
      '& $checkbox_infoIcon:hover': {
        color: actionColor,
      },
      '& $checkbox_inputLabel:hover $checkbox_icon_unchecked': {
        backgroundColor: toCssRgbA(actionColor, 0.1),
      },
      '& $checkbox_icon_checked': {
        backgroundColor: actionColor,
      },
    },
    checkbox_icon: {},
    checkbox_infoIcon: {},
    checkbox_icon_checked: {},
    checkbox_inputLabel: {},
    checkbox_icon_unchecked: {},

    //tabs.scss
    tabs_panel: {},
    tabs: {
      '& $tabs_panel': {
        padding: '24px 24px 30px',
      },
    },
    tabs_headers_option_selected: {},
    tabs_headers: {
      '& $tabs_headers_option_selected': {
        borderBottom: `solid 3px ${actionColor}`,
      },
    },

    //slider.scss
    sliderWithInput_content: {
      '& $slider::-webkit-slider-runnable-track': sliderTrack,
      '& $slider::-webkit-slider-thumb': thumb,
    },
    slider: {},

    //radio-group.scss
    radioGroup_button: {},
    radioGroup_input: {},
    radioGroup: {
      '& $radioGroup_input:checked + $radioGroup_button::after': {
        backgroundColor: actionColor,
      },
    },

    //radio-group-horizontal.scss
    radioGroupHorizontal_group: {
      color: fallbackColor,
    },

    //color-picker.scss
    colorPicker_add_color_button: {
      '& $colorPicker_add_color_label': {
        color: actionColor,
      },
    },
    colorPicker_add_color_label: {},
    colorPicker_reset_color_button: {
      '& $colorPicker_reset_color_label': {
        color: actionColor,
      },
    },
    colorPicker_reset_color_label: {},

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

    //multi-select-link-panel.scss
    linkPanel_enabled: { color: actionColor },
  };
}
