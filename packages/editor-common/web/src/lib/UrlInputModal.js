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
    this.props.setUrl(url);
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
      url = '',
      submittedInvalidUrl = false,
      dataHook,
      title,
      errorMessage,
      placeholder,
      saveLabel,
      cancelLabel,
      onCloseRequested,
    } = this.props;
    return (
      <div className={styles.urlInput_container} data-hook={dataHook} dir={languageDir}>
        <CloseIcon className={classNames(styles.urlInput_closeIcon)} onClick={onCloseRequested} />
        <div className={classNames(styles.urlInput_header)}>
          <div className={styles.urlInput_header_text}>{title}</div>
        </div>
        <div className={styles.socialEmbedUrlInputModal_textInput}>
          <TextInput
            inputRef={ref => {
              this.input = ref;
            }}
            type="url"
            onKeyPress={this.handleKeyPress}
            onChange={this.onUrlChange}
            value={url}
            error={submittedInvalidUrl && errorMessage}
            placeholder={placeholder}
            theme={styles}
            data-hook={`${dataHook}Input`}
          />
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
  url: PropTypes.string,
  t: PropTypes.func,
  languageDir: PropTypes.string,
  submittedInvalidUrl: PropTypes.bool,
  dataHook: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  saveLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
  onCloseRequested: PropTypes.func.isRequired,
};
