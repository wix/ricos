import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '../statics/styles/in-plugin-input.scss';

class InPluginInput extends Component {
  handleFocus = e => {
    e.stopPropagation();
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

  className = classnames(styles.inPluginInput, this.props.className);

  render() {
    return (
      <input
        className={this.className}
        value={this.props.value}
        onChange={this.onChange}
        onFocus={e => this.handleFocus(e)}
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
  setInPluginEditingMode: PropTypes.func,
};

InPluginInput.defaultProps = {
  setInPluginEditingMode: () => false,
  setFocusToBlock: () => false,
};

export default InPluginInput;
