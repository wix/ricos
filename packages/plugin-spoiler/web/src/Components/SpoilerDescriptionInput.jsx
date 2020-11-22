import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditableTextInput from './EditableTextInput';

export default class SpoilerDescriptionInput extends Component {
  componentDidUpdate() {
    this.fixTextAreaHeight();
  }

  fixTextAreaHeight() {
    if (this.textAreaRef?.style) {
      this.textAreaRef.style.height = '';
      this.textAreaRef.style.height = this.textAreaRef.scrollHeight + 'px';
    }
  }

  onChange = e => this.props.onChange(e.target.value);

  setTextAreaRef = ref => (this.textAreaRef = ref);

  render() {
    const { className, onChange, value, setFocusToBlock, setInPluginEditingMode } = this.props;

    return onChange ? (
      <EditableTextInput
        setRef={this.setTextAreaRef}
        className={className}
        value={value}
        onChange={this.onChange}
        setInPluginEditingMode={setInPluginEditingMode}
        setFocusToBlock={setFocusToBlock}
        maxLength={70}
        dataHook={'spoilerTextArea'}
      />
    ) : (
      <span className={className} dir="auto" style={{ display: 'block', maxWidth: '89%' }}>
        {value}
      </span>
    );
  }
}

SpoilerDescriptionInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  setFocusToBlock: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
};
