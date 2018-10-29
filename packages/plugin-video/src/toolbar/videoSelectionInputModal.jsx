import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { mergeStyles, isVideoUrl, TextInput, CloseIcon, Button, WixUtils } from 'wix-rich-content-common';
import styles from '../../statics/styles/video-selection-input-modal.scss';

export default class VideoSelectionInputModal extends Component {
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
    const { theme, t, handleFileSelection, enableCustomUploadOnMobile } = this.props;
    const { styles } = this;
    const uploadVideoSection =
      (
        <div>
          <div className={styles.video_modal_or_upload_video_from}>Or, upload video from your computer</div>
          <div className={styles.video_modal_upload_video}>
            <div
              role="button" onClick={handleFileSelection}
              tabIndex={0}
              onKeyDown={handleFileSelection}
            >
              + Upload video
            </div>
          </div>
        </div>
      );
    return (
      <div>
        <div className={styles.video_modal_container} data-hook="videoUploadModal">
          {!WixUtils.isMobile() && <CloseIcon className={classNames(styles.video_modal_closeIcon)} onClick={() => this.onCloseRequested()} />}
          <div className={styles.video_modal_add_a_Video}>Add a Video</div>
          <div role="heading" aria-labelledby="video_modal_hdr" className={classNames(styles.video_modal_header)}>
            <h3 id="video_modal_hdr" className={styles.video_modal_header_text}>
              {t('VideoUploadModal_Header')}
            </h3>
          </div>
          <div>
            <div className={styles.video_modal_textInput}>
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
            <Button
              className={styles.video_modal_add_button}
              onClick={() => this.onConfirm()}
              ariaProps={!this.state.url && { disabled: 'disabled' }}
            >
              Add Now
            </Button>
          </div>
          {(!WixUtils.isMobile() || enableCustomUploadOnMobile) && handleFileSelection && uploadVideoSection}
        </div>
      </div>
    );
  }
}

VideoSelectionInputModal.propTypes = {
  onConfirm: PropTypes.func,
  pubsub: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  url: PropTypes.string,
  theme: PropTypes.object.isRequired,
  doneLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  t: PropTypes.func,
  handleFileSelection: PropTypes.func,
  enableCustomUploadOnMobile: PropTypes.bool,
};

VideoSelectionInputModal.defaultProps = {
  doneLabel: 'Add Now',
  cancelLabel: 'Cancel',
};
