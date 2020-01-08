import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Context } from 'wix-rich-content-common';
import classnames from 'classnames';
import styles from '../statics/styles/in-plugin-input.scss';

class InPluginInput extends Component {
  handleFocus = () => this.context.setInPluginEditingMode(true);

  handleBlur = () => this.context.setInPluginEditingMode(false);

  handleKeyPress = e => {
    const { setFocusToBlock, value } = this.props;
    if (e.key === 'Enter' && setFocusToBlock && value !== '') {
      this.handleBlur();
      setFocusToBlock();
    }
  };

  onChange = e => this.props.onChange?.(e.target.value);

  className = classnames(styles.inPluginInput, this.props.className);

  render() {
    const { onChange, value } = this.props;
    return (
      <input
        className={this.className}
        value={value}
        readOnly={!onChange}
        onChange={this.onChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
        dir="auto"
      />
    );
  }
}

InPluginInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  setFocusToBlock: PropTypes.func,
};

InPluginInput.contextType = Context.type;

export default InPluginInput;
