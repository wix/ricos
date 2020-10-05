import React from 'react';
import PropTypes from 'prop-types';

const Anchor = React.memo(({ anchorKey, type }) => (
  <div key={anchorKey} type={type} data-hook={anchorKey} /> //'type' attribute is for wix corvid
));

Anchor.propTypes = {
  anchorKey: PropTypes.string,
  type: PropTypes.string,
};

export default Anchor;
