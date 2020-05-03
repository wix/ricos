export const MAP_TYPE = 'wix-draft-plugin-map';

export const DEFAULTS = Object.freeze({
  size: 'content',
  alignment: 'center',
  width: 400,
  height: 400,
  minHeight: 100,
  maxHeight: 1000,
  minWidth: 100,
  maxwidth: 1000,
  config: {
    width: 400,
    height: 400,
    minHeight: 100,
    maxHeight: 1000,
    minWidth: 100,
    maxwidth: 1000,
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

/* eslint-disable camelcase, @typescript-eslint/camelcase */
// ../statics/styles/map-settings-modal.scss
export const THEME = colors => ({
  map_settings_modal_mobile_navbar: {
    backgroundColor: `${colors.actionColor} !important`,
    color: `${colors.bgColor} !important`,
  },
  map_settings_modal_divider: {
    backgroundColor: `${colors.textColor} !important`,
  },
  labeled_toggle_track: {
    backgroundColor: `${colors.textColor} !important`,
  },
  labeled_toggle_track_checked: {
    backgroundColor: `${colors.actionColor} !important`,
  },
  labeled_toggle_slider: {
    backgroundColor: `${colors.bgColor} !important`,
  },
});
