import React from 'react';
import PropTypes from 'prop-types';

const List = ({ ordered, children, className }) => {
  const Component = ordered ? 'ol' : 'ul';
  return <Component className={className}>{children}</Component>;
};

List.propTypes = {
  ordered: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default List;
