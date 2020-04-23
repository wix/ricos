import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchIcon, ClearIcon } from './Icons';
import { mergeStyles } from 'wix-rich-content-common';
import textInputStyles from '../../statics/styles/text-search-input.scss';
import { KEYS_CHARCODE } from 'wix-rich-content-editor-common';
export default class TextSearchInput extends Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.styles = mergeStyles({ styles: textInputStyles, theme });
  }
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
  };

  handleClearText = () => this.props.onChange('');

  render() {
    const { placeHolder, value } = this.props;
    const { styles } = this;
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
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
