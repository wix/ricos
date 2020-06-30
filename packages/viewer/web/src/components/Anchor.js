import React from 'react';
import PropTypes from 'prop-types';

const Anchor = React.memo(({ anchorKey }) => <div key={anchorKey} data-hook={anchorKey} />);

Anchor.propTypes = {
  anchorKey: PropTypes.string,
};

export default Anchor;
