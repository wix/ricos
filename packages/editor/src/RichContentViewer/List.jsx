import React from 'react';
import PropTypes from 'prop-types';
// import './List.css';

const List = ({ ordered, children }) => {
  if (ordered) {
    return (
      <ol>
        {children}
      </ol>);
  } else {
    return (
      <ul>
        {children}
      </ul>);
  }
};
List.propTypes = {
  ordered: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default List;
