import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mergeStyles } from 'wix-rich-content-common';
import { TextSearchInput } from 'wix-rich-content-editor-common';
import styles from '../../statics/styles/giphy-api-input-modal.scss';
import GiphySelector from './giphySelector';
import { CloseIcon } from '../icons';

export default class GiphyApiInputModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      searchTag: '',
    };
  }

  onChange = searchTag => this.setState({ searchTag });

  onCloseRequested = () => {
    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };

  handleClearText = () => {
    this.setState({ searchTag: '' });
  };

  render() {
    const { styles } = this;
    const { t, isMobile, languageDir } = this.props;
    const searchTag = this.state.searchTag;
    const mobileNavbar = (
      <div>
        <div className={styles.giphy_api_input_modal_navbar}>
          {t('GiphyUploadModal_mobileNavbar_Title')}
          <div
            onClick={this.onCloseRequested}
            role="button"
            tabIndex="0"
            onKeyPress={null}
            className={styles.giphy_api_input_modal_closeButton}
          >
            <CloseIcon />
          </div>
        </div>
      </div>
    );
    return (
      <div dir={languageDir}>
        {isMobile ? <div>{mobileNavbar}</div> : null}
        <div className={styles.giphy_api_input_modal_container} data-hook="giphyUploadModal">
          <TextSearchInput
            inputRef={ref => (this.input = ref)}
            onClose={this.onCloseRequested}
            placeHolder={t('GiphyUploadModal_Search_Placeholder')}
            onChange={this.onChange}
            value={this.state.searchTag}
            data-hook="giphyUploadModalInput"
          />
          <GiphySelector
            searchTag={searchTag}
            onCloseRequested={this.onCloseRequested}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

GiphyApiInputModal.propTypes = {
  onChange: PropTypes.func,
  helpers: PropTypes.object.isRequired,
  searchTag: PropTypes.string,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  languageDir: PropTypes.string,
};
