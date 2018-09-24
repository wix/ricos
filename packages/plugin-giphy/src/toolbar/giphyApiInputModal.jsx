import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mergeStyles, TextInput, WixUtils } from 'wix-rich-content-common';
import { SearchIcon, CloseIcon } from '../icons';
import styles from '../../statics/styles/giphy-api-input-modal.scss';
import GiphyApi from './giphyApi';

export default class GiphyApiInputModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      searchTag: ''
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
    const { t, theme } = this.props;
    const searchTag = this.state.searchTag;
    let navbar = null;
    const backButton = <div className={styles.backButton} onClick={this.onCloseRequested} role="button" tabIndex="0" onKeyPress={null} />;
    if (WixUtils.isMobile()) {
      navbar = (
        <div>
          <div className={styles.header}>
          </div>
          <div className={styles.navbar}>
            Choose a gif
          </div>
          {backButton}
        </div>);
    }

    return (
      <div>
        {navbar}
        <div className={styles.container} data-hook="giphyUploadModal">
          <div className={styles.group_form} >
            <TextInput
              inputRef={ref => {
                this.input = ref;
              }}
              className={styles.search}
              onKeyPress={this.handleKeyPress}
              onChange={this.onChange}
              value={this.state.searchTag}
              placeholder={t('GiphyUploadModal_Input_Placeholder')}
              theme={theme}
              data-hook="giphyUploadModalInput"
            />
            <div className={styles.searchIcon} >
              {!this.state.searchTag ? <SearchIcon /> :
                <div onClick={this.handleClearText} role="button" tabIndex="0" onKeyPress={null}>
                  <CloseIcon className={styles.closeIcon} />
                </div>}
            </div>

          </div>

          <GiphyApi
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
  t: PropTypes.func
};
