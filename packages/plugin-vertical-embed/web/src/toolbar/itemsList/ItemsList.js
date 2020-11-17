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
    contentType: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
  };

  render() {
    const { products, onClick, selectedItem, contentType, t } = this.props;
    const emptyState = (
      <div className={generalStyles.emptyState}>
        <div className={generalStyles.title}>
          {t(`Embed_Vertical_${contentType}_EmptyState_NoItems_Title`)}
        </div>
        <div className={generalStyles.description}>
          {t(`Embed_Vertical_${contentType}_EmptyState_NoItems_Description`)}
        </div>
      </div>
    );
    return (
      <div className={styles.container} data-hook="verticalsItemsList">
        {products.length > 0
          ? products.map((item, index) => (
              // eslint-disable-next-line react/jsx-indent
              <Item
                item={item}
                key={index}
                onClick={onClick}
                selected={selectedItem?.id === item.id}
                contentType={contentType}
                t={t}
              />
            ))
          : emptyState}
      </div>
    );
  }
}

export default ItemsList;
