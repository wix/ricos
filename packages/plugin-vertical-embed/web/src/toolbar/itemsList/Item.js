/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/item.scss';
import classnames from 'classnames';

class Item extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onItemClick: PropTypes.func.isRequired,
    selected: PropTypes.bool,
  };

  render() {
    const { onItemClick, selected, item } = this.props;
    const { name, imageSrc, description } = item;
    return (
      <div
        className={classnames(styles.container, selected && styles.selected)}
        onClick={() => onItemClick(item)}
      >
        <div style={{ backgroundImage: `url(${imageSrc})` }} className={styles.image} />
        <div className={styles.title}>{name}</div>
        <div className={styles.description}>{description}</div>
      </div>
    );
  }
}

export default Item;
