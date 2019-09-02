import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mergeStyles, TextInput } from 'wix-rich-content-common';
import { SearchIcon, CloseIcon } from '../icons';
import styles from '../../statics/styles/giphy-api-input-modal.scss';
import GiphySelector from './giphySelector';

export default class GiphyApiInputModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      searchTag: '',
    };
  }

  onChange = e => {
    this.setState({ searchTag: e.target.value });
  };

  onCloseRequested = () => {
    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };

  handleKeyPress = e => {
    if (e.charCode === 27) {
      this.onCloseRequested();
    }
  };
  handleClearText = () => {
    this.setState({ searchTag: '' });
  };

  render() {
    const { styles } = this;
    const { t, theme, isMobile, languageDir } = this.props;
    const searchTag = this.state.searchTag;
    const backButton = (
      <div
        className={styles.giphy_api_input_modal_backButton}
        onClick={this.onCloseRequested}
        role="button"
        tabIndex="0"
        onKeyPress={null}
      />
    );
    const mobileNavbar = (
      <div>
        <div className={styles.giphy_api_input_modal_navbar}>
          {t('GiphyUploadModal_mobileNavbar_Title')} {backButton}
        </div>
      </div>
    );
    return (
      <div dir={languageDir}>
        {isMobile ? <div>{mobileNavbar}</div> : null}
        <div className={styles.giphy_api_input_modal_container} data-hook="giphyUploadModal">
          <div className={styles.giphy_api_input_modal_search_textinput_group}>
            <TextInput
              inputRef={ref => {
                this.input = ref;
              }}
              className={styles.giphy_api_input_modal_search}
              onKeyPress={this.handleKeyPress}
              onChange={this.onChange}
              value={this.state.searchTag}
              placeholder={t('GiphyUploadModal_Input_Placeholder')}
              theme={theme}
              data-hook="giphyUploadModalInput"
            />
            <div className={styles.giphy_api_input_modal_searchIcon}>
              {!this.state.searchTag ? (
                <SearchIcon />
              ) : (
                <div
                  onClick={this.handleClearText}
                  role="button"
                  tabIndex="0"
                  onKeyPress={null}
                  className={styles.giphy_api_input_modal_closeIcon}
                >
                  <CloseIcon />
                </div>
              )}
            </div>
          </div>
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
