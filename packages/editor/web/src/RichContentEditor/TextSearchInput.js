import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchIcon, ClearIcon } from 'wix-rich-content-editor-common/src/Icons';
import { mergeStyles } from 'wix-rich-content-common';
import textInputStyles from '../../statics/styles/text-search-input.scss';

export default class TextSearchInput extends Component {
  componentDidMount() {
    this.input.focus();
    this.input.setSelectionRange(0, this.input.value.length);
  }
  onChange = e => this.props.setSearchTag(e.target.value);

  onCloseRequested = () => {
    this.props.onClose();
  };

  handleKeyPress = e => {
    if (e.charCode === 27) {
      this.onCloseRequested();
    }
  };

  handleClearText = () => this.props.setSearchTag('');

  render() {
    const { placeHolder, theme, searchTag } = this.props;
    const styles = mergeStyles({ styles: textInputStyles, theme });

    return (
      <div className={styles.textInput}>
        <SearchIcon className={styles.textInput_prefixIcon} />
        <input
          ref={ref => {
            this.input = ref;
          }}
          className={styles.textInput_input}
          placeholder={placeHolder}
          onKeyPress={this.handleKeyPress}
          onChange={this.onChange}
          value={searchTag}
        />
        {searchTag && (
          <ClearIcon className={styles.textInput_suffixIcon} onClick={this.handleClearText} />
        )}
      </div>
    );
  }
}

TextSearchInput.propTypes = {
  placeHolder: PropTypes.string,
  onClose: PropTypes.func,
  theme: PropTypes.object.isRequired,
  setSearchTag: PropTypes.func.isRequired,
  searchTag: PropTypes.string.isRequired,
};
