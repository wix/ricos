/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/item.scss';

class Item extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { name, imageSrc, description, onClick } = this.props;

    return (
      <div className={styles.container} onClick={onClick}>
        <div style={{ backgroundImage: `url(${imageSrc})` }} className={styles.image} />
        <div className={styles.title}>{name}</div>
        <div className={styles.description}>{description}</div>
      </div>
    );
  }
}

export default Item;
