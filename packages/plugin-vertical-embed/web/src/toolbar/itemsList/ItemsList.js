import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/items-list.scss';
import Item from './Item';

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {
    products: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired,
  };

  render() {
    const { products, onItemClick } = this.props;
    const { selectedItem } = this.state;
    return (
      <div className={styles.container} data-hook="verticalsItemsList">
        {products.map((item, index) => (
          <Item
            item={item}
            key={index}
            name={item.name}
            imageSrc={item.imageSrc}
            description={item.description}
            onClick={() => onItemClick(item)}
            setSelectedItem={() => this.setState({ selectedItem: item })}
            selected={selectedItem === item}
          />
        ))}
      </div>
    );
  }
}

export default ItemsList;
