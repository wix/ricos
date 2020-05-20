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
    onItemClick: PropTypes.func.isRequired,
    onItemSelected: PropTypes.func.isRequired,
    selectedItem: PropTypes.object,
  };

  onItemClick = item => {
    const { onItemClick, onItemSelected, selectedItem } = this.props;
    if (item.id === selectedItem.id) {
      onItemClick();
    } else {
      this.setState({ selectedItem: item });
      onItemSelected(item);
    }
  };

  render() {
    const { products, selectedItem } = this.props;
    return (
      <div className={styles.container} data-hook="verticalsItemsList">
        {products.map((item, index) => (
          <Item
            item={item}
            key={index}
            onClick={this.onItemClick}
            selected={selectedItem.id === item.id}
          />
        ))}
      </div>
    );
  }
}

export default ItemsList;
