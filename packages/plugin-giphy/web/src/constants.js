export const PAGE_SIZE = 25;
export const WAIT_INTERVAL = 300;
export const SEARCH_TYPE = 'gifs';
export const GIPHY_TYPE = 'wix-draft-plugin-giphy';

export const DEFAULTS = Object.freeze({
  config: {
    size: 'content',
    alignment: 'center',
  },
  configViewer: {
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
});

export const DEFAULT_RESOLUTION = Object.freeze({ desktop: 'original', mobile: 'original' });

export const MOBILE_FULL_SCREEN_CUSTOM_STYLE = Object.freeze({
  overlay: {
    backgroundColor: 'transparent',
  },
  content: {
    top: 0,
    left: 0,
    overflow: 'hidden',
    paddingRight: '6px',
  },
});

export const DESKTOP_FLY_OUT_MODAL_STYLES = Object.freeze({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 5,
  },
  content: {
    width: '265px',
    boxSizing: 'border-box',
    height: '357px',
    overflow: 'visible',
    border: '1px solid #ccc',
    paddingRight: '10px',
    paddingLeft: '18px',
    display: 'block',
    borderRadius: '2px',
    position: 'absolute',
    zIndex: 6,
    paddingTop: '9px',
  },
});

export const EXTERNAL_POPUP_STYLES = Object.freeze({
  content: {
    width: '265px',
    boxSizing: 'border-box',
    height: '357px',
    overflow: 'visible',
    display: 'block',
  },
});
