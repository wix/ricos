import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InSpoilerInput extends Component {
  handleFocus = () => {
    this.props.setFocusToBlock();
    this.props.setInPluginEditingMode(true);
  };

  handleBlur = () => this.props.setInPluginEditingMode(false);

  handleKeyPress = e => {
    const { setFocusToBlock, value } = this.props;

    if (e.key === 'Enter' && setFocusToBlock && value !== '') {
      this.handleBlur();
      setFocusToBlock();
    }
  };

  onChange = e => this.props.onChange?.(e.target.value);

  render() {
    return (
      <input
        className={this.props.className}
        value={this.props.value}
        onChange={this.onChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
        disabled={this.props.disabled}
        dir="auto"
      />
    );
  }
}

InSpoilerInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  setFocusToBlock: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  disabled: PropTypes.bool,
};

InSpoilerInput.defaultProps = {
  setInPluginEditingMode: () => false,
  setFocusToBlock: () => false,
  value: 'This image contains a spoiler',
};

export default InSpoilerInput;
