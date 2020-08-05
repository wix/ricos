import React from 'react';
import PropTypes from 'prop-types';

export default class EditableTextWrapper extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    setFocusToBlock: PropTypes.func,
    setInPluginEditingMode: PropTypes.func,
    InputComponent: PropTypes.object,
  };

  static defaultProps = {
    setInPluginEditingMode: () => false,
    setFocusToBlock: () => false,
  };

  handleFocus = e => {
    e.preventDefault();
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

  onChange = e => this.props.onChange?.(e);

  render() {
    const elementProps = {
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onChange: this.onChange,
      onKeyPress: this.handleKeyPress,
      value: this.props.value,
    };
    return React.cloneElement(React.Children.only(this.props.InputComponent), elementProps);
  }
}
