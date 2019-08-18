import { FaSmile, FaPaw, FaPlane, FaBell, FaHeart, FaFlag, FaBeer } from 'react-icons/fa';

export const EMOJI_TYPE = 'wix-draft-plugin-emoji';
export const ALIGN_CENTER = 'center';

export const faIcons = [
  () => <FaBeer />,
  <FaBell />,
  <FaSmile />,
  <FaPaw />,
  <FaPlane />,
  <FaHeart />,
  <FaFlag />,
];

export const DEFAULTS = {
  config: {
    alignment: ALIGN_CENTER,
    size: 'small',
    width: 'fit-content',
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
};
