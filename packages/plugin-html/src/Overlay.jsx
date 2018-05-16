import React from 'react';
import PropTypes from 'prop-types';

const Overlay = ({ isVisible, onClick, width, height }) => (
  <div
    data-hook="overlay" onClick={onClick && onClick()} role="none"
    style={{ display: isVisible ? 'none' : 'block', width: `${width}px`, height: `${height}px`, position: 'absolute', top: '0', left: '0' }}
  />
);

Overlay.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

export default Overlay;
