import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '../../statics/styles/in-plugin-input.scss';
// For now

class InPluginInput extends Component {
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

  onChange = (onChange, key, isTitle) => e => {
    onChange?.(key, e.target.value, isTitle);
  };

  className = classnames(styles.inPluginInput, this.props.className);

  render() {
    const { isTitle, onChange, index } = this.props;

    return (
      <input
        className={this.className}
        value={this.props.value}
        onChange={this.onChange(onChange, index, isTitle)}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
        dir="auto"
        placeholder={isTitle ? 'Write text to show' : 'Write text to hide'}
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
  index: PropTypes.string,
  isTitle: PropTypes.bool,
};

InPluginInput.defaultProps = {
  setInPluginEditingMode: () => false,
  setFocusToBlock: () => false,
};

export default InPluginInput;
