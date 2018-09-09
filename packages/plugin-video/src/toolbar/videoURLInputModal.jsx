import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { VideoCameraIcon } from '../icons';
import classNames from 'classnames';
import { mergeStyles, isVideoUrl, SettingsPanelFooter, TextInput, CloseIcon } from 'wix-rich-content-common';
import styles from '../../statics/styles/video-url-input-modal.scss';

export default class VideoURLInputModal extends Component {
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
    if (isVideoUrl(url)) {
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
      <div className={styles.container} data-hook="videoUploadModal">
        <CloseIcon className={classNames(styles.closeIcon)} onClick={() => this.onCloseRequested()} />
        <div role="heading" aria-labelledby="video_modal_hdr" className={classNames(styles.header)}>
          <VideoCameraIcon className={classNames(styles.cameraIcon, styles.header_icon)} />
          <h3 id="video_modal_hdr" className={styles.header_text}>
            {t('VideoUploadModal_Header')}
          </h3>
        </div>
        <div className={styles.videoUrlInputModal_textInput}>
          <TextInput
            inputRef={ref => {
              this.input = ref;
            }}
            type="url"
            onKeyPress={this.handleKeyPress}
            onChange={this.onUrlChange}
            value={url}
            error={!isVideoUrl(url) && submitted ? t('VideoUploadModal_Input_InvalidUrl') : null}
            placeholder={t('VideoUploadModal_Input_Placeholder')}
            theme={theme}
            data-hook="videoUploadModalInput"
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

VideoURLInputModal.propTypes = {
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

VideoURLInputModal.defaultProps = {
  doneLabel: 'Add Now',
  cancelLabel: 'Cancel',
};
