export const PAGE_SIZE = 25;
export const WAIT_INTERVAL = 300;
export const SEARCH_TYPE = 'gifs';
export const MODAL_TYPE = 'flyOutModal';
export const GIPHY_TYPE = 'wix-draft-plugin-giphy';
export const GIPHY_API_KEY = 'wv9cEt7t1nu5wFYinAs73zwDzrrclGqk';

const gphApiClient = require('giphy-js-sdk-core');
export const giphyApiClient = gphApiClient(GIPHY_API_KEY);

export const DEFAULTS = {
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
    zIndex: 10
  },
  content: {
    width: '265px',
    boxSizing: 'border-box',
    height: '357px',
    overflow: 'visible',
    border: '1px solid #ccc',
    paddingRight: '8px',
    paddingLeft: '18px',
    display: 'block',
    position: 'absolute',
    zIndex: 6,
    paddingTop: '8px'
  }
};
