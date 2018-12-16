export const MAP_TYPE = 'wix-draft-plugin-map';

export const DEFAULTS = {
  map:{
    address: 'Wix HQ, Nemal Tel Aviv Street, Tel Aviv-Yafo, Israel',
    zoom: 18,
    lat: 32.097235, 
    lng: 34.774270,
    mode: 'roadmap',
    isMarkerShown: true,
    isControlsShown: true
  },
  config: {
    size: 'content',
    alignment: 'center'
  },
};

export const MobileFullScreenCustomStyle = {
  overlay: {
    backgroundColor: 'transparent'
  },
  content: {
    top: 0,
    left: 0,
    overflow: 'hidden',
    paddingRight: '6px'
  }
};

export const DesktopFlyOutModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 5
  },
  content: {
    width: '275px',
    boxSizing: 'border-box',
    height: '475px',
    overflow: 'visible',
    border: '1px solid #ccc',
    paddingRight: '15px',
    paddingLeft: '15px',
    display: 'block',
    position: 'absolute',
    zIndex: 6,
    paddingTop: '8px',
    paddingBottom: '8px'
  }
};

export const options = [{
  value: 'roadmap',
  label: 'ROADMAP'
}, {
  value: 'hybrid',
  label: 'HYBRID'
}, {
  value: 'terrain',
  label: 'TERRAIN'
}, {
  value: 'satellite',
  label: 'SATELLITE'
}];