import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { CloseIcon } from '../Icons';
import SettingsPanelFooter from '../Components/SettingsPanelFooter';
import TextInput from '../Components/TextInput';
import { KEYS_CHARCODE } from '../consts';
import styles from '../../statics/styles/url-input-modal.scss';

export default class UrlInputModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onUrlChange = event => {
    const url = event.target.value;
    this.props.onInputChange(url);
  };

  handleKeyPress = event => {
    if (event.charCode === KEYS_CHARCODE.ENTER) {
      this.props.onConfirm();
    }
    if (event.charCode === KEYS_CHARCODE.ESCAPE) {
      this.props.onCloseRequested();
    }
  };

  componentDidMount() {
    this.input.focus();
    this.input.setSelectionRange(0, this.input.value.length);
  }

  render() {
    const {
      t,
      languageDir,
      onConfirm,
      input = '',
      submittedInvalidUrl = false,
      dataHook,
      title,
      subtitle,
      errorMessage,
      placeholder,
      saveLabel,
      cancelLabel,
      onCloseRequested,
      isMobile,
      Component,
    } = this.props;
    return (
      <div
        className={classNames(styles.urlInput_container, {
          [styles.withSubtitle]: subtitle && !isMobile,
        })}
        data-hook={dataHook}
        dir={languageDir}
      >
        <CloseIcon className={classNames(styles.urlInput_closeIcon)} onClick={onCloseRequested} />
        <div className={classNames(styles.urlInput_header)}>
          <div className={styles.urlInput_header_text}>{title}</div>
          {subtitle && <div className={styles.urlInput_header_subtitle}>{subtitle}</div>}
        </div>
        <div
          className={classNames(styles.urlInputModal_textInput, {
            [styles.withSubtitle]: subtitle,
          })}
        >
          <TextInput
            onClick={() => this.setState({ isDropdownOpen: true })}
            inputRef={ref => {
              this.input = ref;
            }}
            type="url"
            id="dropdown-text-input"
            onKeyPress={this.handleKeyPress}
            onChange={this.onUrlChange}
            value={input}
            error={submittedInvalidUrl && errorMessage}
            placeholder={placeholder}
            theme={styles}
            data-hook={`${dataHook}Input`}
            autoComplete="off"
          />
          {Component && <Component />}
        </div>
        <SettingsPanelFooter
          className={styles.urlInput_modal_footer}
          save={() => onConfirm()}
          cancel={onCloseRequested}
          saveLabel={saveLabel}
          cancelLabel={cancelLabel}
          theme={styles}
          t={t}
        />
      </div>
    );
  }
}

UrlInputModal.propTypes = {
  onConfirm: PropTypes.func,
  input: PropTypes.string,
  t: PropTypes.func,
  languageDir: PropTypes.string,
  submittedInvalidUrl: PropTypes.bool,
  dataHook: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  saveLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCloseRequested: PropTypes.func.isRequired,
  subtitle: PropTypes.string,
  Component: PropTypes.any,
  isMobile: PropTypes.bool,
};
