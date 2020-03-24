/* eslint-disable camelcase */
import { adaptForeground, hexToRgbA } from './utils';

export default function editorCommon(colors) {
  const actionColor = adaptForeground(colors.actionColor);
  const blockActionColorSettings = {
    cursor: 'default',
    boxShadow: `0 0 0 3px ${actionColor} !important`,
  };
  const sliderTrack = { background: `${actionColor} !important` };
  const thumb = { ...sliderTrack, border: `4px solid ${actionColor}` };
  return {
    //block focus
    hasFocus: blockActionColorSettings,
    pluginContainer: { '&:hover': blockActionColorSettings },

    //selection-list.scss
    selectionListOption: {
      width: '100%',
      height: '85px',
      margin: '0 ',
      textAlign: 'center',
      display: 'inline-flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: hexToRgbA(actionColor, 0.05),
      },
    },
    selectionListOption_selected: {
      color: actionColor,
      '&$selectionListOption': {
        backgroundColor: hexToRgbA(actionColor, 0.08),
      },
      '&$selectionListOption:hover': {
        backgroundColor: hexToRgbA(actionColor, 0.08),
      },
    },

    //tabs.scss
    tabs_panel: {
      padding: '24px 24px 30px !important',
    },
    tabs_headers_option_selected: {
      borderBottom: `solid 3px ${actionColor} !important`,
    },

    //button.scss
    button_primary: {
      background: `${actionColor} !important`,
    },
    button_secondary: {
      color: actionColor,
      borderColor: `${actionColor} !important`,
      '&:hover': {
        color: actionColor,
      },
    },

    //slider.scss
    slider: {
      '&::-webkit-slider-runnable-track': sliderTrack,
      '&::-webkit-slider-thumb': thumb,
    },

    //radio-group.scss
    radioGroup_button: {
      border: `1px solid ${actionColor} !important`,
    },

    radioGroup_input: {
      '&:checked + $radioGroup_button': {
        '&::after': {
          backgroundColor: `${actionColor} !important`,
        },
      },
    },
  };
}
