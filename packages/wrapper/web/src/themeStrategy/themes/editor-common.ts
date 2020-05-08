/* eslint-disable @typescript-eslint/camelcase */
import { adaptForeground, hexToRgbA } from './utils';

export default function editorCommon(colors: PaletteColors) {
  const actionColor = adaptForeground(colors.actionColor);
  const blockActionColorSettings = {
    cursor: 'default',
    boxShadow: `0 0 0 3px ${colors.actionColor} !important`,
  };
  const sliderTrack = { background: `${actionColor} !important` };
  const thumb = { ...sliderTrack, border: `4px solid ${actionColor}` };
  //button.scss
  const buttonsFooterStyle = {
    '& $button_primary': {
      backgroundColor: actionColor,
    },
    '& $button_primary:hover:not([disabled])': {
      backgroundColor: hexToRgbA(actionColor, 0.8),
    },
    '& $button_primary:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    '& $button_secondary': {
      color: actionColor,
      borderColor: actionColor,
    },
    '& $button_secondary:hover': {
      color: hexToRgbA(actionColor, 0.6),
      borderColor: hexToRgbA(actionColor, 0.6),
    },
    '& $button_secondary:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
  };
  return {
    //block focus
    hasFocus: blockActionColorSettings,
    pluginContainer: {
      '&:hover': blockActionColorSettings,
      '&$hasFocus': blockActionColorSettings,
    },

    //selection-list.scss
    selectionListOption: {
      '&:hover': {
        backgroundColor: `${hexToRgbA(actionColor, 0.05)} !important`,
      },
    },
    selectionListOption_selected: {
      color: actionColor,
      backgroundColor: `${hexToRgbA(actionColor, 0.1)} !important`,
      '&$selectionListOption:hover': {
        backgroundColor: hexToRgbA(actionColor, 0.1),
      },
    },

    //checkbox.scss
    checkbox_icon: {
      border: `solid 1px ${actionColor} !important`,
      '&:hover': {
        color: `${hexToRgbA(actionColor, 0.1)} !important`,
      },
    },
    checkbox_infoIcon: {
      '&:hover': {
        color: `${actionColor} !important`,
      },
    },
    checkbox_icon_checked: {
      backgroundColor: `${actionColor} !important`,
    },
    checkbox_inputLabel: {
      '&:hover $checkbox_icon_unchecked': {
        backgroundColor: `${hexToRgbA(actionColor, 0.1)} !important`,
      },
    },
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

    //button.scss
    button_primary: {},
    button_secondary: {},
    settingsPanel_footer_fixed: buttonsFooterStyle, //gallery, map...
    button_inputModal_modal_footer: buttonsFooterStyle, //button plugin
    video_modal_container_big: buttonsFooterStyle, //video plugin
    video_modal_container_small: buttonsFooterStyle, //video plugin

    //slider.scss
    slider: {
      '&::-webkit-slider-runnable-track': sliderTrack,
      '&::-webkit-slider-thumb': thumb,
    },

    //radio-group.scss
    radioGroup_button: {},
    radioGroup_input: {},
    radioGroup: {
      '& $radioGroup_input:checked + $radioGroup_button::after': {
        backgroundColor: actionColor,
      },
    },

    //color-picker.scss
    colorPicker_add_color_label: {
      color: `${actionColor} !important`,
    },

    //side-toolbar.scss + toolbar-button.scss
    //editor + editor-common
    sideToolbar: {
      '& button:hover:not([disabled]) svg, button:focus:not([disabled]) svg': {
        color: `${actionColor} !important`,
        fill: `${actionColor} !important`,
      },
      '& label:hover:not([disabled]) svg, label:focus:not([disabled]) svg': {
        color: `${actionColor} !important`,
        fill: `${actionColor} !important`,
      },
    },

    //inline-toolbar-button.scss
    inlineToolbarButton_icon: {
      '&:hover': {
        color: `${actionColor} !important`,
        '& svg': {
          fill: `${actionColor} !important`,
        },
      },
    },

    //plugin-toolbar-button.scss
    pluginToolbarButton_disabled: {},
    pluginToolbarButton_active: {
      color: `${actionColor} !important`,
      fill: `${actionColor} !important`,
    },
    pluginToolbarButton: {
      '&:not($pluginToolbarButton_disabled):hover >:not($Dropdown-root) svg': {
        color: `${actionColor} !important`,
        fill: `${actionColor} !important`,
      },
      '&:not($pluginToolbarButton_disabled):focus svg': {
        color: `${actionColor} !important`,
        fill: `${actionColor} !important`,
      },
      '&:not($pluginToolbarButton_disabled)$pluginToolbarButton_active svg': {
        color: `${actionColor} !important`,
        fill: `${actionColor} !important`,
      },
      '&:not($pluginToolbarButton_disabled):hover': {},
    },

    //dropdown.scss
    'Dropdown-control': {
      '&:hover': {
        color: `${actionColor} !important`,
      },
    },
    'Dropdown-option': {
      '&:hover': {
        color: `${actionColor} !important`,
      },
    },
    'Dropdown-root': {},
  };
}
