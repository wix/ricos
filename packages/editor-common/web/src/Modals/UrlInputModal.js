import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { CloseIcon } from '../Icons';
import SettingsPanelFooter from '../Components/SettingsPanelFooter';
import TextInput from '../Components/TextInput';
import { KEYS_CHARCODE, FOOTER_BUTTON_ALIGNMENT } from '../consts';
import styles from '../../statics/styles/url-input-modal.scss';
import { mergeStyles } from 'wix-rich-content-common';

export default class UrlInputModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { theme = {}, buttonAlignment } = props;
    const endAlignment = buttonAlignment === FOOTER_BUTTON_ALIGNMENT.END;
    this.styles = mergeStyles({ styles, theme });
    this.containerClassName = classNames(
      styles.urlInput_container,
      endAlignment && this.styles.endAlignment
    );
    this.closeClassName = classNames(
      styles.urlInput_closeIcon,
      endAlignment && this.styles.endAlignment
    );
    this.headerClassName = classNames(
      styles.urlInput_header,
      endAlignment && this.styles.endAlignment
    );
    this.inputClassName = classNames(
      styles.urlInputModal_textInput,
      endAlignment && this.styles.endAlignment
    );
  }

  onUrlChange = url => {
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
      errorMessage,
      placeholder,
      onCloseRequested,
      children,
      theme,
      buttonAlignment = FOOTER_BUTTON_ALIGNMENT.CENTER,
    } = this.props;
    const { styles } = this;
    return (
      <div className={this.containerClassName} data-hook={dataHook} dir={languageDir}>
        <CloseIcon className={this.closeClassName} onClick={onCloseRequested} />
        <div className={this.headerClassName}>
          <div className={styles.urlInput_header_text}>{title}</div>
        </div>
        <div className={this.inputClassName}>
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
          {children}
        </div>
        <SettingsPanelFooter
          className={styles.urlInput_modal_footer}
          save={() => onConfirm()}
          cancel={onCloseRequested}
          saveLabel={t('EmbedURL_Common_CTA_Primary')}
          cancelLabel={t('EmbedURL_Common_CTA_Secondary')}
          theme={theme}
          layoutOptions={{ isModal: true, buttonAlignment }}
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
  onInputChange: PropTypes.func.isRequired,
  onCloseRequested: PropTypes.func.isRequired,
  children: PropTypes.any,
  theme: PropTypes.object,
  buttonAlignment: PropTypes.bool,
};
