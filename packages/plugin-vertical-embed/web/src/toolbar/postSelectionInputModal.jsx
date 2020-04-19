import PropTypes from 'prop-types';
import React, { Component } from 'react';
import UrlInputModal from 'wix-rich-content-editor-common/dist/lib/UrlInputModal';
export default class PostSelectionInputModal extends Component {
  state = {
    errorMsg: '',
    products: [],
    selectedProduct: null,
  };

  componentDidMount() {
    this.search();
  }

  searchProducts = query => {
    const {
      fetchFunctions,
      componentData: { type },
    } = this.props;
    const abortController = new AbortController();
    const promise = fetchFunctions[type](query, abortController.signal)
      .then(res => {
        if (res.ok) return res;
        else throw res.statusText;
      })
      .then(res => res.json());
    return {
      abortController,
      promise,
    };
  };

  currentAbortController = null;
  async search(query) {
    const { abortController, promise } = this.searchProducts(query);
    if (this.currentAbortController) {
      this.currentAbortController.abort();
    }
    this.currentAbortController = abortController;

    try {
      const products = await promise;
      this.setState({ products });
    } catch (e) {
      if (e?.name === 'AbortError') {
        return;
      }
      throw e;
    }
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
    return (
      <UrlInputModal
        onConfirm={this.onConfirm}
        helpers={helpers}
        t={t}
        title={`Select embed ${type}`}
        subtitle={`Choose a ${type} from your ${type} list`}
        dataHook={`verticalEmbedModal`}
        saveLabel={t('EmbedURL_Common_CTA_Primary')}
        cancelLabel={t('EmbedURL_Common_CTA_Secondary')}
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
