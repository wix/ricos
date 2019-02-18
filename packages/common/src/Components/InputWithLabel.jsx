import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import classNames from 'classnames';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../../statics/styles/input-with-label.scss';

class InputWithLabel extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  renderInput = () => {
    const { styles } = this;
    const { id, isTextArea, isFullHeight, dataHook, ...otherProps } = this.props;
    const inputProps = omit(otherProps, ['theme']);
    const inputClassName = classNames(styles.inputWithLabel_input, {
      [styles.inputWithLabel_textArea]: isTextArea,
      [styles.inputWithLabel_fullHeight]: isFullHeight,
    });
    const InputComponent = isTextArea ? 'textarea' : 'input';

    return (
      <InputComponent className={inputClassName} id={id} data-hook={dataHook} {...inputProps} />
    );
  };

  render() {
    const { styles } = this;
    const { id, label } = this.props;
    if (label) {
      return (
        <label htmlFor={id}>
          <span className={styles.inputWithLabel_label}>{label}</span>
          {this.renderInput()}
        </label>
      );
    } else {
      return this.renderInput();
    }
  }
}

InputWithLabel.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  theme: PropTypes.object.isRequired,
  isTextArea: PropTypes.bool,
  isFullHeight: PropTypes.bool,
  dataHook: PropTypes.string,
};

export default InputWithLabel;
