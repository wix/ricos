export const UNSPLASH_TYPE = 'wix-draft-plugin-unsplash';
export const DEFAULTS = {
  config: {
    size: 'center',
    alignment: 'center',
  },
  image: {
    alt: '',
    caption: '',
    height: 0,
    isValidUrl: false,
    nofollow: false,
    originalUrl: ``,
    targetBlank: false,
    url: '',
    username: '',
    width: 0,
  },
};

export const MobileFullScreenCustomStyle = {
  overlay: {
    backgroundColor: 'transparent',
  },
  content: {
    top: 0,
    left: 0,
    overflow: 'hidden',
    paddingRight: '6px',
  },
};

export const DesktopFlyOutModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 5,
  },
  content: {
    width: '620px',
    maxWidth: '620px',
    boxSizing: 'border-box',
    height: '375px',
    overflow: 'visible',
    paddingRight: '0px',
    paddingLeft: '10px',
    display: 'block',
    borderRadius: '2px',
    position: 'absolute',
    top: '605px',
    zIndex: 6,
    paddingTop: '9px',
    paddingBottom: '12px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 0 4px 0 rgba(0, 0, 0, 0.1)',
    border: ' solid 1px rgba(255, 255, 255, 0.25)',
  },
};
