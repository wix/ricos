import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../Styles/input-with-label.scss';

class InputWithLabel extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  renderInput = () => {
    const { styles } = this;
    const { id, placeholder, value, onChange, isTextArea, dataHook } = this.props;
    const inputClassName = classNames(styles.inputWithLabel_input, { [styles.inputWithLabel_textArea]: isTextArea });
    if (isTextArea) {
      return <textarea className={inputClassName} placeholder={placeholder} id={id} value={value} data-hook={dataHook} onChange={onChange}/>;
    } else {
      return <input className={inputClassName} placeholder={placeholder} id={id} value={value} data-hook={dataHook} onChange={onChange}/>;
    }
  };

  render() {
    const { styles } = this;
    const { id, label } = this.props;
    if (label) {
      return <label htmlFor={id}><span className={styles.inputWithLabel_label}>{label}</span>{this.renderInput()}</label>;
    } else {
      return this.renderInput();
    }
  }
}

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  theme: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isTextArea: PropTypes.bool,
  dataHook: PropTypes.string,
};

export default InputWithLabel;
