import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/items-list.scss';
import generalStyles from '../../../statics/styles/general.scss';
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
    type: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
  };

  render() {
    const { products, onClick, selectedItem, type, t } = this.props;
    return (
      <div className={styles.container} data-hook="verticalsItemsList">
        {products.length > 0 ? (
          products.map((item, index) => (
            <Item
              item={item}
              key={index}
              onClick={onClick}
              selected={selectedItem?.id === item.id}
            />
          ))
        ) : (
          <div className={generalStyles.emptyState}>
            <div>{t(`verticalEmbed_unavailable_${type}s`)}</div>
            <div>{t(`verticalEmbed_unavailable_${type}s_subtitle`)}</div>
          </div>
        )}
      </div>
    );
  }
}

export default ItemsList;
