import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { UrlInputModal } from 'wix-rich-content-editor-common';
import { contentTypeMap } from '../constants';
import ItemsList from './itemsList/ItemsList';
export default class PostSelectionInputModal extends Component {
  constructor(props) {
    super(props);
    const {
      verticalsApi,
      componentData: { type },
    } = props;
    this.verticalApi = verticalsApi[type];
    this.verticalApi.search('').then(products => this.setState({ products }));
  }
  state = {
    errorMsg: '',
    products: [],
    selectedProduct: null,
  };

  onInputChange = (inputString = '') => {
    this.verticalApi.search(inputString).then(products => this.setState({ products }));
    this.setState({ inputString });
  };

  onConfirm = item => {
    const { onConfirm, componentData, helpers } = this.props;
    if (!onConfirm) {
      return;
    }

    onConfirm({
      ...componentData,
      selectedProduct: item,
    });
    helpers.closeModal();
  };

  render() {
    const { products, inputString } = this.state;
    const {
      t,
      componentData: { type },
      helpers,
      isMobile,
    } = this.props;
    const contentType = contentTypeMap[type];
    return (
      <UrlInputModal
        onConfirm={this.onConfirm}
        helpers={helpers}
        t={t}
        title={t(`Embed_Vertical_${contentType}_Title`)}
        subtitle={`Choose a ${contentType} from your ${contentType} list`}
        dataHook={'verticalEmbedModal'}
        saveLabel={t('EmbedURL_Common_CTA_Primary')}
        cancelLabel={t('EmbedURL_Common_CTA_Secondary')}
        placeholder={t(`Embed_Vertical_${contentType}_Placeholder`)}
        setSelection={selectedProduct => this.setState({ selectedProduct })}
        onCloseRequested={helpers.closeModal}
        dropdownItems={products}
        onInputChange={this.onInputChange}
        input={inputString}
        isMobile={isMobile}
        Component={() => <ItemsList products={products} />}
      />
    );
  }
}

PostSelectionInputModal.propTypes = {
  onConfirm: PropTypes.func,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  verticalsApi: PropTypes.object.isRequired,
};
