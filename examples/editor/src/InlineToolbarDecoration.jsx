import React from 'react';
import PropTypes from 'prop-types';

const InlineToolbarDecoration = ({ position, children }) => (
  <div style={{ top: position.top - 40, left: position.left}}>
    {children}
  </div>
);

InlineToolbarDecoration.propTypes = {
  children: PropTypes.node,
  position: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
  })
}

InlineToolbarDecoration.defaultProps = {
  position: {
    top: 0,
    left: 0
  }
};

export default InlineToolbarDecoration;
