/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/item.scss';
import classnames from 'classnames';

class Item extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.bool,
  };

  render() {
    const { name, imageSrc, description, onClick, selected } = this.props;
    return (
      <div className={classnames(styles.container, selected && styles.selected)} onClick={onClick}>
        <div style={{ backgroundImage: `url(${imageSrc})` }} className={styles.image} />
        <div className={styles.title}>{name}</div>
        <div className={styles.description}>{description}</div>
      </div>
    );
  }
}

export default Item;
