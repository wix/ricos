import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/item.scss';

class Item extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  render() {
    const { name, imageSrc, description } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div style={{ backgroundImage: `url(${imageSrc})` }} className={styles.image} />
          <div className={styles.info}>
            <div className={styles.title}>{name}</div>
            <div className={styles.description}>{description}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
