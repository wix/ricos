import { PaletteColors, ThemeUtils } from 'wix-rich-content-common';

export const MAP_TYPE = 'wix-draft-plugin-map';

export const DEFAULTS = Object.freeze({
  size: 'content',
  alignment: 'center',
  width: 400,
  height: 400,
  minHeight: 100,
  maxHeight: 1000,
  minWidth: 100,
  maxWidth: 1000,
  config: {
    width: 400,
    height: 400,
    minHeight: 100,
    maxHeight: 1000,
    minWidth: 100,
    maxWidth: 1000,
    mapSettings: {
      address: 'Wix HQ, Nemal Tel Aviv Street, Tel Aviv-Yafo, Israel',
      locationDisplayName: 'Wix HQ, Nemal Tel Aviv Street, Tel Aviv-Yafo, Israel',
      lat: 32.097235,
      lng: 34.77427,
      zoom: 18,
      mode: 'roadmap',
      isMarkerShown: true,
      isZoomControlShown: true,
      isStreetViewControlShown: true,
      isDraggingAllowed: true,
    },
  },
});

export const theme = (colors: PaletteColors, utils: ThemeUtils) => {
  const { textColor, bgColor } = colors;
  const actionColor = utils.adaptForeground(colors.actionColor);
  return {
    map_settings_modal_mobile_navbar_wrapper: {
      backgroundColor: actionColor,
      color: bgColor,
    },
    map_settings_modal_divider_wrapper: {
      '& $map_settings_modal_divider': {
        backgroundColor: textColor,
      },
    },
    map_settings_modal_divider: {},
    labeled_toggle_input_container: {
      '& $labeled_toggle_switch $labeled_toggle_track': {
        backgroundColor: textColor,
      },
      '& $labeled_toggle_switch $labeled_toggle_track_checked': {
        backgroundColor: actionColor,
      },
      '& $labeled_toggle_switch $labeled_toggle_slider': {
        backgroundColor: utils.fallbackColorBright,
      },
    },
    labeled_toggle_track: {},
    labeled_toggle_switch: {},
    labeled_toggle_track_checked: {},
    labeled_toggle_slider: {},
  };
};
