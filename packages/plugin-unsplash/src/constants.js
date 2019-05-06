export const UNSPLASH_TYPE = 'wix-draft-plugin-unsplash';
export const DEFAULTS = {
  config: {
    size: 'content',
    alignment: 'center',
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
    height: '372px',
    overflow: 'visible',
    border: '1px solid #ccc',
    paddingRight: '0px',
    paddingLeft: '10px',
    display: 'block',
    borderRadius: '2px',
    position: 'absolute',
    top: '605px',
    zIndex: 6,
    paddingTop: '9px',
    paddingBottom: '12px',
  },
};
