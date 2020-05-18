import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/items-list.scss';
import Item from './Item';

class ItemsList extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired,
  };

  render() {
    const { products, onItemClick } = this.props;

    return (
      <div className={styles.container}>
        {products.map((item, index) => (
          <Item
            key={index}
            name={item.name}
            imageSrc={item.imageSrc}
            description={item.description}
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>
    );
  }
}

export default ItemsList;
