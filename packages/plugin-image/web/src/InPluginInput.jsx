import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Context } from 'wix-rich-content-common';
import classnames from 'classnames';
import styles from '../statics/styles/in-plugin-input.scss';

class InPluginInput extends Component {
  handleFocus = () => this.context.enableInPluginEditing(true);

  handleBlur = () => this.context.enableInPluginEditing(false);

  handleKeyPress = e => {
    const { setFocusToBlock } = this.props;
    if (e.key === 'Enter' && setFocusToBlock) {
      this.handleBlur();
      setFocusToBlock();
    }
  };

  className = classnames(
    styles[`inPluginInput${this.props.onChange ? '' : 'Viewer'}`],
    this.props.className
  );

  render() {
    const { onChange, value } = this.props;
    return (
      <input
        className={this.className}
        value={value}
        readOnly={!onChange}
        onChange={onChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
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

InPluginInput.defaultProps = {
  value: ' ',
};

InPluginInput.contextType = Context.type;

export default InPluginInput;
