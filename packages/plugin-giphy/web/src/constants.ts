import { ModalStyles } from 'wix-rich-content-common';

export const PAGE_SIZE = 25;
export const WAIT_INTERVAL = 300;
export const SEARCH_TYPE = 'gifs';
export const GIPHY_TYPE = 'wix-draft-plugin-giphy';

export const DEFAULTS = {
  config: {
    size: 'content',
    alignment: 'center',
  },
  configViewer: {
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
}

export const DEFAULT_RESOLUTION = { desktop: 'original', mobile: 'original' });

export const MOBILE_FULL_SCREEN_CUSTOM_STYLE: ModalStyles = {
  overlay: {
    backgroundColor: 'transparent',
  },
  content: {
    top: 0,
    left: 0,
    overflow: 'hidden',
    paddingRight: '6px',
  },
}

export const DESKTOP_FLY_OUT_MODAL_STYLES: ModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 5,
  },
  content: {
    width: '320px',
    boxSizing: 'border-box',
    height: '364px',
    overflow: 'visible',
    border: 'solid 1px rgba(51, 51, 51, 0.1)',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.06)',
    paddingRight: '12px',
    paddingLeft: '12px',
    display: 'block',
    position: 'absolute',
    zIndex: 6,
    paddingTop: '12px',
  },
}

export const EXTERNAL_POPUP_STYLES: ModalStyles = {
  content: {
    width: '265px',
    boxSizing: 'border-box',
    height: '357px',
    overflow: 'visible',
    display: 'block',
  },
}
