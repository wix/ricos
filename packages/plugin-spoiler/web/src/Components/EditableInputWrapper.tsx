import React, { Component, FocusEventHandler, KeyboardEventHandler, ReactElement } from 'react';

interface Props {
  InputComponent: ReactElement;
  value: string;
  onChange: (event) => void;
  setInPluginEditingMode: (shouldEnable: boolean) => void;
  setFocusToBlock: () => void;
  setRef?: (ref: HTMLInputElement | null) => void;
}

class EditableTextInput extends Component<Props> {
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
    const { InputComponent, setRef, value, onChange } = this.props;

    const props = {
      ref: setRef,
      value,
      onChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeyPress: this.handleKeyPress,
      dir: 'auto',
    };

    return React.cloneElement(InputComponent, props);
  }
}

export default EditableTextInput;
