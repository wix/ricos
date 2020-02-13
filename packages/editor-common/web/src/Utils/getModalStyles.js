import { merge } from 'lodash';

const mobileModalStyles = {
  overlay: {
    top: 0,
    left: 'auto',
    right: 0,
    bottom: 'auto',
    position: 'absolute',
    width: '100%',
    height: 'calc(100% + 5px)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 5,
  },
  content: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: 0,
    left: 0,
    bottom: 'auto',
    border: 'none',
    backgroundColor: 'white',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: 0,
    padding: 0,
    width: 'calc(100% - 20px)',
    margin: '0 10px',
    direction: 'ltr',
    zIndex: 6,
  },
};

const mobileFullScreenOverrideStyles = {
  overlay: {
    top: 0,
    left: 0,
    right: 'auto',
    bottom: 'auto',
    height: '100vh',
    width: '100vw',
    margin: 0,
    zIndex: 5,
  },
  content: {
    top: 0,
    left: 0,
    right: 'auto',
    bottom: 'auto',
    backgroundColor: '#fff',
    height: '100vh',
    width: '100vw',
    margin: 0,
    transform: 'none',
    direction: 'ltr',
    zIndex: 6,
  },
};

const desktopSideBarStyles = {
  overlay: {
    top: 0,
    left: 'auto',
    right: 0,
    bottom: 'auto',
    position: 'fixed',
    width: '100%',
    height: 'calc(100% + 85px)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 5,
  },
  content: {
    position: 'fixed',
    top: 0,
    left: 'auto',
    right: 0,
    bottom: 'auto',
    border: 'none',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: 0,
    padding: 0,
    height: '100%',
    width: '100%',
    maxWidth: '420px',
    direction: 'ltr',
    zIndex: 6,
  },
};

const desktopModalOverrideStyles = {
  overlay: {},
  content: {
    top: 'calc(50%)',
    transform: 'translateY(-50%)',
    left: 0,
    right: 0,
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    direction: 'ltr',
  },
};

const inlineStyles = {
  overlay: {
    background: 'transparent',
    pointerEvents: 'none',
  },
  content: {
    pointerEvents: 'initial',
  },
};

export const getModalStyles = ({
  customStyles = null,
  fullScreen = true,
  inline = false,
  isMobile = false,
} = {}) => {
  const overrideStyles = [];
  if (isMobile) {
    if (fullScreen) {
      overrideStyles.push(mobileFullScreenOverrideStyles);
    }
    if (customStyles) {
      overrideStyles.push(customStyles);
    }
    return merge({}, mobileModalStyles, ...overrideStyles);
  } else {
    if (!fullScreen) {
      overrideStyles.push(desktopModalOverrideStyles);
    }
    if (inline) {
      overrideStyles.push(inlineStyles);
    }
    if (customStyles) {
      overrideStyles.push(customStyles);
    }
    return merge({}, desktopSideBarStyles, ...overrideStyles);
  }
};

export const getBottomToolbarModalStyles = (
  buttonRef,
  { customStyles = null, fullScreen = true, inline = false, isMobile = false } = {}
) => {
  const modalStyles = getModalStyles({
    customStyles,
    fullScreen,
    inline,
    isMobile,
  });
  const height = customStyles.content.height.slice(0, 3);
  const { top, left, right } = buttonRef.getBoundingClientRect();
  const isAboveButton = top - height - 11 > 0;
  const isRtl = buttonRef.closest('[dir=rtl]') !== null;
  const contentStyles = {
    top: isAboveButton ? top - height - 11 : top + 30,
    margin: 0,
    position: 'absolute',
  };
  if (isRtl) {
    contentStyles.right = window.innerWidth - right - 10;
  } else {
    contentStyles.left = left - 15;
  }
  return {
    ...modalStyles,
    content: {
      ...modalStyles.content,
      ...contentStyles,
    },
  };
};
