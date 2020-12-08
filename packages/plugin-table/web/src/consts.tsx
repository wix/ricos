import { ModalStyles } from 'wix-rich-content-common';

export const DesktopFlyOutModalStyles: ModalStyles = Object.freeze({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 5,
  },
  content: {
    width: '362px',
    boxSizing: 'border-box',
    height: '212px',
    overflow: 'visible',
    border: 'solid 1px rgba(51, 51, 51, 0.1)',
    display: 'block',
    borderRadius: '2px',
    position: 'absolute',
    zIndex: 6,
    padding: '20px',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.06)',
  },
});

export const MOBILE_FULL_SCREEN_CUSTOM_STYLE: ModalStyles = Object.freeze({
  overlay: {
    backgroundColor: 'transparent',
  },
  content: {
    top: 0,
    left: 0,
    overflow: 'hidden',
    paddingRight: '20px',
    paddingLeft: '20px',
    alignItems: 'center',
    display: 'flex',
    width: 'auto',
  },
});

export const COLORS = Object.freeze({
  color1: '#FFFFFF',
  color2: '#D5D4D4',
  color3: '#000000',
  color4: '#000000',
  color5: '#000000',
  color6: '#ABCAFF',
  color7: '#81B0FF',
  color8: '#0261FF',
  color9: '#0141AA',
  color10: '#012055',
});

export const CELL_MANUAL_MIN_WIDTH = 65;
export const CELL_AUTO_MIN_WIDTH = 120;
export const ROW_DEFAULT_HEIGHT = 47;
export const COL_DEFAULT_WIDTH = 'auto';
