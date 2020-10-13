import { merge } from 'lodash';
import { TOOLBARS } from '../consts';
import { ModalStyles } from 'wix-rich-content-common';

const mobileModalStyles: ModalStyles = {
  overlay: {
    top: 0,
    left: 'auto',
    right: 0,
    bottom: 'auto',
    position: 'absolute',
    width: '100%',
    height: 'calc(100% + 5px)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 10000,
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

const stickyButtomMobileStyles: ModalStyles = {
  overlay: { ...mobileModalStyles.overlay, position: 'fixed' },
  content: {
    width: '100%',
    bottom: 0,
    height: 'max-content',
    padding: 0,
    right: 0,
    left: 0,
    top: 'unset',
    fontWeight: 'unset',
  },
};

const mobileFullScreenOverrideStyles: ModalStyles = {
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

const desktopSideBarStyles: ModalStyles = {
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

const desktopModalOverrideStyles: ModalStyles = {
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

const inlineStyles: ModalStyles = {
  overlay: {
    background: 'transparent',
    pointerEvents: 'none',
  },
  content: {
    pointerEvents: 'initial',
  },
};

export const getModalStyles = ({
  customStyles,
  fullScreen = true,
  inline = false,
  isMobile = false,
  stickyButtomMobile = false,
}: {
  customStyles?: ModalStyles;
  fullScreen?: boolean;
  inline?: boolean;
  isMobile?: boolean;
  stickyButtomMobile?: boolean;
} = {}): ModalStyles => {
  const overrideStyles: ModalStyles[] = [];
  if (isMobile) {
    if (fullScreen) {
      overrideStyles.push(mobileFullScreenOverrideStyles);
    }
    if (customStyles) {
      overrideStyles.push(customStyles);
    }
    if (stickyButtomMobile) {
      return stickyButtomMobileStyles;
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
  buttonRef: HTMLElement,
  {
    customStyles,
    centered = false,
    fullScreen = true,
    inline = false,
    isMobile = false,
  }: {
    customStyles: ModalStyles;
    centered?: boolean;
    fullScreen?: boolean;
    inline?: boolean;
    isMobile?: boolean;
  },
  toolbarName: string
) => {
  const modalStyles = getModalStyles({
    customStyles,
    fullScreen,
    inline,
    isMobile,
  });
  const height = parseInt(customStyles.content?.height?.toString().slice(0, 3) || '0', 10);
  const { top, left, right, width } = buttonRef.getBoundingClientRect();
  const isAboveButton = top - height - 11 > 0;
  const isRtl = buttonRef.closest('[dir=rtl]') !== null;
  const contentStyles: ModalStyles['content'] = {
    top: isAboveButton ? top - height - 11 : top + 30,
    margin: 0,
    position: 'absolute',
  };
  if (toolbarName === TOOLBARS.SIDE) {
    contentStyles.top = isAboveButton ? top - 100 : top - 20;
    contentStyles.right = window.innerWidth - right - 10;
    contentStyles.left = left + 30;
  } else if (toolbarName === TOOLBARS.SHORTCUT) {
    contentStyles.top = top - height + 9;
    contentStyles.left = left - 114;
    contentStyles.right = 0;
  } else if (centered) {
    contentStyles.left =
      left + width / 2 - parseInt(modalStyles?.content?.width?.toString() || '0') / 2;
    contentStyles.margin = modalStyles?.content?.margin || contentStyles.margin;
  } else if (isRtl) {
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
