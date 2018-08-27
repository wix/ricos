import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { SoundCloudIcon } from '../icons';
import classNames from 'classnames';
import { mergeStyles, isSoundcloudUrl, SettingsPanelFooter, TextInput } from 'wix-rich-content-common';
import styles from '../../statics/styles/soundcloud-url-input-modal.scss';

export default class SoundcloudURLInputModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { componentData } = this.props;
    this.state = {
      url: componentData.src || '',
    };
  }

  onUrlChange = e => {
    const url = e.target.value;
    this.setState({ url });
  };

  afterOpenModal = () => this.input.focus();

  onConfirm = () => {
    const { url } = this.state;
    if (url && isSoundcloudUrl(url)) {
      const { componentData, helpers, pubsub, onConfirm } = this.props;
      if (onConfirm) {
        onConfirm({ ...componentData, src: url });
      } else {
        pubsub.update('componentData', { src: url });
      }

      if (helpers && helpers.onVideoSelected) {
        helpers.onVideoSelected(url, data => pubsub.update('componentData', { metadata: { ...data } }));
      }

      this.onCloseRequested();
    } else {
      this.setState({ submitted: true });
    }
  };

  onCloseRequested = () => {
    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onConfirm();
    }
  };

  render() {
    const { url, submitted } = this.state;
    const { theme, doneLabel, cancelLabel, t } = this.props;
    const { styles } = this;

    return (
      <div className={styles.container} data-hook="soundcloudUploadModal">
          <div type="button" className={styles.closeIcon} aria-label="Close" onClick = {() => this.onCloseRequested()}>
              <span aria-hidden="true">X</span>
          </div>
        <div role="heading" aria-labelledby="soundcloud_modal_hdr" className={classNames(styles.header)}>
          <SoundCloudIcon className={classNames(styles.header_icon)} />
          <h3 id="soundcloud_modal_hdr" className={styles.header_text}>
            {t('SoundCloudUploadModal_Header')}
          </h3>
        </div>
        <div className={styles.soundcloudUrlInputModal_textInput}>
          <TextInput
            inputRef={ref => {
              this.input = ref;
            }}
            type="url"
            onKeyPress={this.handleKeyPress}
            onChange={this.onUrlChange}
            value={url}
            error={!isSoundcloudUrl(url) && submitted ? t('SoundCloudUploadModal_Input_InvalidUrl') : null}
            placeholder={t('SoundCloudUploadModal_Input_Placeholder')}
            theme={theme}
            data-hook="soundcloudUploadModalInput"
          />
        </div>
        <SettingsPanelFooter
          className={styles.modal_footer}
          save={() => this.onConfirm()}
          cancel={() => this.onCloseRequested()}
          saveLabel={doneLabel}
          cancelLabel={cancelLabel}
          theme={theme}
          t={t}
        />
      </div>
    );
  }
}

SoundcloudURLInputModal.propTypes = {
  onConfirm: PropTypes.func,
  pubsub: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  url: PropTypes.string,
  theme: PropTypes.object.isRequired,
  doneLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  t: PropTypes.func,
};

SoundcloudURLInputModal.defaultProps = {
  doneLabel: 'Add Now',
  cancelLabel: 'Cancel',
};
