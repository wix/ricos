import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/items-list.scss';
import Item from './Item';

class ItemsList extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
  };

  render() {
    const { products } = this.props;

    return (
      <div className={styles.container}>
        {products.map(({ name, imageSrc, description }, index) => (
          <Item name={name} imageSrc={imageSrc} description={description} key={index} />
        ))}
      </div>
    );
  }
}

export default ItemsList;
