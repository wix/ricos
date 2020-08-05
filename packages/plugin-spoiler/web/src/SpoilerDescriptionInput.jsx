import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditableTextWrapper from './EditableTextWrapper';
import { findDOMNode } from 'react-dom';

export default class SpoilerDescriptionInput extends Component {
  componentWillReceiveProps() {
    // eslint-disable-next-line react/no-find-dom-node
    const element = this.textAreaElement || findDOMNode(this);
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
    this.textAreaElement = element;
  }

  render() {
    const { className, disabled, ...otherProps } = this.props;
    const InputComponent = (
      <textarea
        rows="1"
        disabled={disabled}
        data-hook={!disabled && 'spoilerTextArea'}
        className={className}
        maxLength="70"
      />
    );

    return <EditableTextWrapper InputComponent={InputComponent} {...otherProps} />;
  }
}

SpoilerDescriptionInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  setFocusToBlock: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  disabled: PropTypes.bool,
};

SpoilerDescriptionInput.defaultProps = {
  setInPluginEditingMode: () => false,
  setFocusToBlock: () => false,
};
