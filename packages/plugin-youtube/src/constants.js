export const PAGE_SIZE = 25;
export const WAIT_INTERVAL = 300;
export const YOUTUBE_TYPE = 'wix-draft-plugin-youtube';
export const VIDEO_TYPE_LEGACY = 'VIDEO-EMBED';
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
    height: '383px',
    overflow: 'visible',
    border: '1px solid #ccc',
    display: 'block',
    borderRadius: '2px',
    position: 'absolute',
    zIndex: 6,
  },
};
