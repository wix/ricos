/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import classNames from 'classnames';
import { InfoIcon } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/input-with-label.scss';
import generalstyles from 'wix-rich-content-editor-common/dist/statics/styles/general.scss';

class InputWithLabel extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  handleOnChange = e => {
    const { onChange, getTarget } = this.props;
    onChange(getTarget ? e.target : e.target.value);
  };

  renderInput = () => {
    const { styles } = this;
    const {
      id,
      isTextArea,
      isFullHeight,
      dataHook,
      isMobile,
      tooltipTextKey,
      t,
      ...otherProps
    } = this.props;
    const inputProps = omit(otherProps, ['theme', 'onChange']);
    const inputClassName = classNames(styles.inputWithLabel_input, {
      [styles.inputWithLabel_textArea]: isTextArea,
      [styles.inputWithLabel_fullHeight]: isFullHeight,
    });
    const InputComponent = isTextArea ? 'textarea' : 'input';

    return (
      <InputComponent
        className={inputClassName}
        id={id}
        data-hook={dataHook}
        onChange={this.handleOnChange}
        {...inputProps}
      />
    );
  };

  renderCharacterCapacity = () => {
    const { styles } = this;
    const { value, maxLength } = this.props;
    return <span className={styles.inputWithLabel_capacity}>{value.length + '/' + maxLength}</span>;
  };

  render() {
    const { styles } = this;
    const { id, label, maxLength, tooltipTextKey, t, isMobile } = this.props;
    const showTooltip = !isMobile && tooltipTextKey;

    if (label) {
      return (
        <label htmlFor={id}>
          <div className={generalstyles.infoContainer}>
            <span className={styles.inputWithLabel_label}>{label}</span>
            {showTooltip && (
              <InfoIcon iconStyles={styles.infoIcon} tooltipText={t(tooltipTextKey)} />
            )}
          </div>
          {this.renderInput()}
          {maxLength && this.renderCharacterCapacity()}
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
  value: PropTypes.string,
  maxLength: PropTypes.number,
  tooltipTextKey: PropTypes.string,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  onChange: PropTypes.func,
  getTarget: PropTypes.bool,
};

InputWithLabel.defaultProps = {
  value: '',
  isMobile: false,
};

export default InputWithLabel;
