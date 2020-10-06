import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  UrlInputModal,
  FOOTER_BUTTON_ALIGNMENT,
  LoaderIcon,
} from 'wix-rich-content-plugin-commons';
import { contentTypeMap } from '../constants';
import ItemsList from './itemsList/ItemsList';
import styles from '../../statics/styles/vertical-embed-modal.scss';
import generalStyles from '../../statics/styles/general.scss';
export default class PostSelectionInputModal extends Component {
  state = {
    errorMsg: '',
    products: [],
    selectedProduct: this.props.componentData?.selectedProduct || null,
    status: 'LOADING',
  };

  componentDidMount() {
    const {
      verticalsApi,
      componentData: { type },
      locale,
    } = this.props;
    this.verticalApi = verticalsApi(type, locale);
    this.verticalApi.search('').then(products => {
      products.length === 0
        ? this.setState({ status: 'NO_ITEMS' })
        : this.setState({ status: 'READY' });

      this.setState({ products });
    });
  }

  onInputChange = (inputString = '') => {
    this.verticalApi.search(inputString).then(products => {
      products.length === 0
        ? this.setState({ status: 'FAILED' })
        : this.setState({ status: 'READY' });
      this.setState({ products });
    });
    this.setState({ inputString });
  };

  onConfirm = () => {
    const { onConfirm, componentData, helpers, onReplace } = this.props;
    const { selectedProduct } = this.state;
    if (!selectedProduct) {
      return;
    }
    const addFunc = onConfirm || onReplace;
    addFunc({
      ...componentData,
      selectedProduct,
    });
    helpers.closeModal();
  };

  onItemClick = item => {
    const { selectedProduct } = this.state;
    if (item.id === selectedProduct?.id) {
      this.onConfirm();
    } else {
      this.setState({ selectedProduct: item });
    }
  };

  render() {
    const { products, inputString, selectedProduct, status } = this.state;
    const {
      t,
      componentData: { type },
      helpers,
      isMobile,
    } = this.props;
    const contentType = contentTypeMap[type];
    const selected = selectedProduct !== null;
    const emptyState = (
      <div className={generalStyles.emptyState}>
        <div>{t(`verticalEmbed_search_${type}_failed`)}</div>
        <div>{t(`verticalEmbed_search_${type}_failed_subtitle`)}</div>
      </div>
    );
    return (
      <UrlInputModal
        onConfirm={this.onConfirm}
        helpers={helpers}
        t={t}
        title={t(`Embed_Vertical_${contentType}_Title`)}
        dataHook={'verticalEmbedModal'}
        placeholder={t(`Embed_Vertical_${contentType}_Placeholder`)}
        onCloseRequested={helpers.closeModal}
        onInputChange={this.onInputChange}
        input={inputString}
        isMobile={isMobile}
        buttonAlignment={FOOTER_BUTTON_ALIGNMENT.END}
        selected={selected}
        noItems={status === 'NO_ITEMS'}
      >
        <div className={styles.itemsWrapper}>
          {status === 'LOADING' ? (
            <div className={generalStyles.emptyState}>
              <LoaderIcon className={styles.fileLoaderIcon} />
            </div>
          ) : status === 'FAILED' ? (
            emptyState
          ) : (
            <ItemsList
              selectedItem={selectedProduct}
              products={products}
              onClick={this.onItemClick}
              type={type}
              t={t}
            />
          )}
        </div>
      </UrlInputModal>
    );
  }
}

PostSelectionInputModal.propTypes = {
  onConfirm: PropTypes.func,
  onReplace: PropTypes.func,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  verticalsApi: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};
