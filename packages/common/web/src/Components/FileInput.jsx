import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../../statics/styles/general.scss';

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = { focused: false };
    this.id = `file_input_${Math.floor(Math.random() * 9999)}`;
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur() {
    this.setState({ focused: false });
  }

  handleChange = e => {
    this.props.onChange(Array.from(e.target.files));
  };

  renderInput() {
    const { accept, multiple, className, title, children, dataHook, tabIndex } = this.props;
    const hasMultiple = multiple ? { multiple } : {};
    const { styles } = this;
    const a11yProps = {
      role: 'button',
      'aria-label': title,
    };

    return (
      <label
        htmlFor={this.id}
        className={classnames({ [className]: true, [styles.focused]: this.state.focused })}
        style={this.props.style}
        title={title}
      >
        <input
          {...a11yProps}
          className={styles.visuallyHidden}
          id={this.id}
          type={'file'}
          data-hook={dataHook}
          onChange={this.handleChange}
          onClick={() => this.value === null}
          accept={accept}
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          tabIndex={tabIndex}
          {...hasMultiple}
        />
        {children}
      </label>
    );
  }

  renderButton() {
    const { handleFileSelection, multiple, className, title, children, dataHook } = this.props;
    const onClick = () => handleFileSelection(multiple);
    const a11yProps = {
      'aria-label': title,
    };
    return (
      <label className={className} htmlFor={this.id} style={this.props.style} title={title}>
        <button {...a11yProps} id={this.id} data-hook={dataHook} onClick={onClick}>
          {children}
        </button>
      </label>
    );
  }

  render() {
    const { handleFileSelection } = this.props;
    return handleFileSelection ? this.renderButton() : this.renderInput();
  }
}

FileInput.propTypes = {
  accept: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  handleFileSelection: PropTypes.func,
  children: PropTypes.node,
  multiple: PropTypes.bool,
  title: PropTypes.string,
  style: PropTypes.object,
  theme: PropTypes.object,
  dataHook: PropTypes.string,
  tabIndex: PropTypes.number,
};

FileInput.defaultProps = {
  accept: 'image/*',
  multiple: false,
};

export default FileInput;
