import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/items-list.scss';
import Item from './Item';

class ItemsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { selectedItem: {} };
  }
  static propTypes = {
    products: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    selectedItem: PropTypes.object,
  };

  render() {
    const { products, onClick, selectedItem } = this.props;
    return (
      <div className={styles.container} data-hook="verticalsItemsList">
        {products.map((item, index) => (
          <Item item={item} key={index} onClick={onClick} selected={selectedItem?.id === item.id} />
        ))}
      </div>
    );
  }
}

export default ItemsList;
