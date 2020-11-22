import React, { Component, FocusEventHandler, KeyboardEventHandler } from 'react';

interface Props {
  className: string;
  value: string;
  onChange: (event) => void;
  setFocusToBlock: () => void;
  setInPluginEditingMode: (shouldEnable: boolean) => void;
  setRef?: (ref: HTMLInputElement | null) => void;
  size?: number;
  maxLength?: number;
  dataHook?: string;
}

class EditableTextInput extends Component<Props> {
  static defaultProps = {
    setInPluginEditingMode: () => false,
    setFocusToBlock: () => false,
  };

  handleFocus: FocusEventHandler<HTMLInputElement> = e => {
    e.stopPropagation();
    this.props.setFocusToBlock();
    this.props.setInPluginEditingMode(true);
  };

  handleBlur = () => this.props.setInPluginEditingMode(false);

  handleKeyPress: KeyboardEventHandler<HTMLInputElement> = e => {
    const { setFocusToBlock, value } = this.props;
    if (e.key === 'Enter' && setFocusToBlock && value !== '') {
      this.handleBlur();
      setFocusToBlock();
    }
  };

  render() {
    const { setRef, value, className, onChange, maxLength, size, dataHook } = this.props;
    return (
      <input
        ref={setRef}
        className={className}
        value={value}
        onChange={onChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
        size={size}
        type="text"
        data-hook={dataHook}
        maxLength={maxLength}
        dir="auto"
      />
    );
  }
}

export default EditableTextInput;
