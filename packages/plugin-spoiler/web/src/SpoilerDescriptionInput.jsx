import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditableTextWrapper from './EditableTextWrapper';
import { findDOMNode } from 'react-dom';

export default class SpoilerDescriptionInput extends Component {
  componentWillReceiveProps() {
    const isTextArea = this.props.onChange;
    if (isTextArea) {
      // eslint-disable-next-line react/no-find-dom-node
      const element = this.textAreaElement || findDOMNode(this);
      element.style.height = 'auto';
      element.style.height = element.scrollHeight + 'px';
      this.textAreaElement = element;
    }
  }
  onChange = e => this.props.onChange(e.target.value);

  render() {
    const { className, onChange, value, ...otherProps } = this.props;
    const InputComponent = (
      <textarea
        rows="1"
        data-hook={'spoilerTextArea'}
        className={className}
        maxLength="70"
        dir="auto"
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
      <span className={className} style={{ display: 'block', maxWidth: '89%' }}>
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

SpoilerDescriptionInput.defaultProps = {
  setInPluginEditingMode: () => false,
  setFocusToBlock: () => false,
};
