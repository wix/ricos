import React from 'react';
import PropTypes from 'prop-types';

export default class InButtonInput extends React.Component {
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

  onChange = e => {
    e.preventDefault();
    this.props.onChange?.(e.target.value);
  };

  className = this.props.className;

  render() {
    return (
      <input
        className={this.className}
        value={this.props.value}
        onChange={this.onChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
        dir="auto"
        type="text"
      />
    );
  }
}

InButtonInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  setFocusToBlock: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
};

InButtonInput.defaultProps = {
  setInPluginEditingMode: () => false,
  setFocusToBlock: () => false,
};
