import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mergeStyles, TextInput } from 'wix-rich-content-common';
import styles from '../../statics/styles/giphy-api-input-modal.scss';
import GiphyApi from './giphyApi';

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

  render() {
    const { styles } = this;
    const { t, theme } = this.props;
    const searchTag = this.state.searchTag;
    return (
      <div className={styles.container} data-hook="giphyUploadModal">
        <div className={styles.giphyUrlInputModal_textInput}>
          <TextInput
            inputRef={ref => {
              this.input = ref;
            }}
            onKeyPress={this.handleKeyPress}
            onChange={this.onChange}
            value={this.state.searchTag}
            placeholder={t('GiphyUploadModal_Input_Placeholder')}
            theme={theme}
            data-hook="giphyUploadModalInput"
          />
        </div>
        <GiphyApi searchTag={searchTag} onCloseRequested={this.onCloseRequested} {...this.props} />
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
};

