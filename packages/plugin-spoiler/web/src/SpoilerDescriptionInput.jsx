import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditableTextWrapper from './EditableTextWrapper';

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
    const { className, onChange, value, ...otherProps } = this.props;
    const InputComponent = (
      <textarea
        rows="1"
        data-hook={'spoilerTextArea'}
        className={className}
        maxLength="70"
        dir="auto"
        ref={this.setTextAreaRef}
      />
    );

    return onChange ? (
      <EditableTextWrapper
        InputComponent={InputComponent}
        onChange={this.onChange}
        value={value}
        {...otherProps}
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
