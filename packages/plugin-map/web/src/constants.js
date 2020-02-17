export const MAP_TYPE = 'wix-draft-plugin-map';

export const DEFAULTS = Object.freeze({
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
