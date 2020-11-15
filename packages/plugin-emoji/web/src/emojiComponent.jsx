import React from 'react';
import PropTypes from 'prop-types';

export const emojiComponent = props => {
  return <span style={{ fontFamily: 'cursive' }}>{props.children}</span>;
};

emojiComponent.propTypes = {
  children: PropTypes.element,
};
