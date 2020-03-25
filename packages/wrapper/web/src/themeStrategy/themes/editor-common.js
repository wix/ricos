/* eslint-disable camelcase */
import { adaptForeground, hexToRgbA } from './utils';

export default function editorCommon(colors) {
  const actionColor = adaptForeground(colors.actionColor);
  const blockActionColorSettings = {
    cursor: 'default',
    boxShadow: `0 0 0 3px ${colors.actionColor} !important`,
  };
  const sliderTrack = { background: `${actionColor} !important` };
  const thumb = { ...sliderTrack, border: `4px solid ${actionColor}` };
  return {
    //block focus
    hasFocus: blockActionColorSettings,
    pluginContainer: { '&:hover': blockActionColorSettings },

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
    tabs_panel: {
      padding: '24px 24px 30px !important',
    },
    tabs_headers_option_selected: {
      borderBottom: `solid 3px ${actionColor} !important`,
    },

    //button.scss
    button_primary: {
      backgroundColor: `${actionColor} !important`,
      '&:hover:not([disabled])': {
        backgroundColor: `${hexToRgbA(actionColor, 0.8)} !important`,
      },
      '&:disabled': {
        backgroundColor: 'rgba(0, 0, 0, 0.4) !important',
      },
    },
    button_secondary: {
      color: actionColor,
      borderColor: `${actionColor} !important`,
      '&:hover': {
        color: hexToRgbA(actionColor, 0.6),
        borderColor: `${hexToRgbA(actionColor, 0.6)} !important`,
      },
      '&:disabled': {
        backgroundColor: 'rgba(0, 0, 0, 0.4) !important',
      },
    },

    //slider.scss
    slider: {
      '&::-webkit-slider-runnable-track': sliderTrack,
      '&::-webkit-slider-thumb': thumb,
    },

    //radio-group.scss
    radioGroup_button: {},
    radioGroup_input: {
      '&:checked + $radioGroup_button': {
        '&::after': {
          backgroundColor: `${actionColor} !important`,
        },
      },
    },
  };
}
