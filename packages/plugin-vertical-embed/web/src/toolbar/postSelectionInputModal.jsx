import PropTypes from 'prop-types';
import React, { Component } from 'react';
import UrlInputModal from 'wix-rich-content-editor-common/dist/lib/UrlInputModal';
import { contentTypeMap } from '../constants';
export default class PostSelectionInputModal extends Component {
  constructor(props) {
    super(props);
    const {
      fetchFunctions,
      componentData: { type },
    } = props;
    this.fetcher = fetchFunctions[type];
    this.fetcher.get().then(products => this.setState({ products }));
  }
  state = {
    errorMsg: '',
    products: [],
    selectedProduct: null,
  };

  async search(query = '') {
    const products = await this.fetcher.search(query);
    this.setState({ products });
  }

  onInputChange = inputString => {
    this.search(inputString);
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
  fetchFunctions: PropTypes.object.isRequired,
};
