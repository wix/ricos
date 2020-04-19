/* eslint-disable */

import PropTypes from 'prop-types';
import React from 'react';
import styles from '../../statics/styles/items-dropdown.scss';

const ItemsDropdown = ({ items, onItemClick }) => {
  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <div onClick={() => onItemClick(item)} key={index}>
          {item.name}
        </div>
      ))}
    </div>
  );
};

ItemsDropdown.propTypes = {
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default ItemsDropdown;
