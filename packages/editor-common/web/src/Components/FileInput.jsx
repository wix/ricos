import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
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

  onClick = () => {
    const { handleFileSelection, multiple } = this.props;
    handleFileSelection(multiple);
  };

  handleChange = e => {
    this.props.onChange(Array.from(e.target.files));
    e.target.value = null;
  };

  render() {
    const {
      accept,
      multiple,
      className,
      title,
      children,
      dataHook,
      tabIndex,
      disabled,
      handleFileSelection,
    } = this.props;
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
        {handleFileSelection ? (
          <button
            className={styles.visuallyHidden}
            {...a11yProps}
            id={this.id}
            data-hook={dataHook}
            onClick={this.onClick}
          />
        ) : (
          <input
            {...a11yProps}
            className={styles.visuallyHidden}
            disabled={disabled}
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
        )}
        {children}
      </label>
    );
  }
}

FileInput.propTypes = {
  accept: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  handleFileSelection: PropTypes.func,
  children: PropTypes.node,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  style: PropTypes.object,
  theme: PropTypes.object,
  dataHook: PropTypes.string,
  tabIndex: PropTypes.number,
};

FileInput.defaultProps = {
  accept: 'image/*',
  multiple: false,
  disabled: false,
};

export default FileInput;
