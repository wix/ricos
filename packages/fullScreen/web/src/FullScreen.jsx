import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import InnerFullscreen from './InnerFullScreen';

export default function Fullscreen(props) {
  const { target, isOpen, ...rest } = props;
  let fullscreen = <InnerFullscreen {...rest} />;

  if (target) {
    fullscreen = ReactDOM.createPortal(fullscreen, target);
  }

  return isOpen ? fullscreen : null;
}

Fullscreen.propTypes = {
  images: PropTypes.array.isRequired,
  isOpen: PropTypes.bool,
  isMobile: PropTypes.bool,
  index: PropTypes.number,
  topMargin: PropTypes.object,
  backgroundColor: PropTypes.object,
  foregroundColor: PropTypes.object,
  onClose: PropTypes.func,
  target: PropTypes.elementType,
};
