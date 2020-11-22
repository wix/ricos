import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchIcon, ClearIcon } from '../Icons';
import styles from '../../statics/styles/text-search-input.scss';
import { KEYS_CHARCODE } from '../consts';
export default class TextSearchInput extends Component {
  componentDidMount() {
    this.input.focus();
    this.input.setSelectionRange(0, this.input.value.length);
  }
  onChange = e => this.props.onChange(e.target.value);

  onCloseRequested = () => {
    this.props.onClose();
  };

  handleKeyPress = e => {
    if (e.charCode === KEYS_CHARCODE.ESCAPE) {
      this.onCloseRequested();
    }
    if (e.charCode === KEYS_CHARCODE.ENTER) {
      const elements = Array.from(document.querySelectorAll('button,input'));
      const searchInputIndex = elements.indexOf(e.target);
      elements[searchInputIndex + 1]?.click();
    }
  };

  handleClearText = () => this.props.onChange('');

  render() {
    const { placeHolder, value } = this.props;
    return (
      <div className={styles.container}>
        <SearchIcon className={styles.prefixIcon} />
        <input
          ref={ref => {
            this.input = ref;
          }}
          className={styles.input}
          placeholder={placeHolder}
          onKeyPress={this.handleKeyPress}
          onChange={this.onChange}
          value={value}
        />
        {value && <ClearIcon className={styles.suffixIcon} onClick={this.handleClearText} />}
      </div>
    );
  }
}

TextSearchInput.propTypes = {
  placeHolder: PropTypes.string,
  onClose: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
