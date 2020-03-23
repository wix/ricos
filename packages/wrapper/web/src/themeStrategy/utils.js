/* eslint-disable camelcase */
const getBrightness = hexCode => {
  // return between 0-255
  // strip off any leading #
  const _hexCode = hexCode.replace('#', '');

  const r = parseInt(_hexCode.substr(0, 2), 16);
  const g = parseInt(_hexCode.substr(2, 2), 16);
  const b = parseInt(_hexCode.substr(4, 2), 16);

  return (r * 299 + g * 587 + b * 114) / 1000;
};

export const getForegroundColor = actionColor => {
  // if action color is dark enough, choose it. else - white.
  //return getBrightness(actionColor) < 255 / 2 ? actionColor : '#000000';
  return getBrightness(actionColor) < 140 ? actionColor : '#0261ff';
};

export const gallerySettingsTheme = colors => {
  const actionColor = getForegroundColor(colors.actionColor);
  const sliderTrack = { background: `${actionColor} !important` };
  const thumb = { ...sliderTrack, border: `4px solid ${actionColor}` };
  return {
    itemContainerSelected: {
      boxShadow: `0 0 0 3px ${actionColor} !important`,
    },
    layoutsSelector_icon_selected: {
      color: getForegroundColor(actionColor),
    },
    imageRatioSelector_ratioButton_selected: {
      backgroundColor: actionColor,
    },
    thumbnailPlacementSelector_icon_selected: {
      color: actionColor,
    },
    selectionListOption_selected: {
      color: actionColor,
    },
    tabs_headers_option_selected: {
      borderBottom: `solid 3px ${actionColor} !important`,
    },
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

    slider: {
      '&::-webkit-slider-runnable-track': sliderTrack,
      '&::-webkit-slider-thumb': thumb,
    },

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
};
