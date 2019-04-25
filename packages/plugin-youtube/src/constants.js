export const YOUTUBE_TYPE = 'wix-draft-plugin-youtube';
export const YOUTUBE_URL = 'https://www.youtube.com/watch?v=';
export const YOUTUBE_V3_API_LINK = 'https://www.googleapis.com/youtube/v3/';

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
    height: '376px',
    overflow: 'visible',
    display: 'block',
    borderRadius: '2px',
    position: 'absolute',
    zIndex: 6,
    border: 'solid 1px rgba(255, 255, 255, 0.25)',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 0 4px 0 rgba(0, 0, 0, 0.1)',
  },
};
