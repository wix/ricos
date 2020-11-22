import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditableInputWrapper from './EditableInputWrapper';

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

    const InputComponent = (
      <textarea
        setRef={this.setTextAreaRef}
        className={className}
        rows={1}
        maxLength={70}
        data-hook="spoilerTextArea"
      />
    );

    return onChange ? (
      <EditableInputWrapper
        InputComponent={InputComponent}
        value={value}
        onChange={this.onChange}
        setInPluginEditingMode={setInPluginEditingMode}
        setFocusToBlock={setFocusToBlock}
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
