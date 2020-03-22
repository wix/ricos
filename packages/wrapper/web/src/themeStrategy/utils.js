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
  return {
    itemContainerSelected: {
      boxShadow: `0 0 0 3px ${actionColor}`,
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
  };
};
