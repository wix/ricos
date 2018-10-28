import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { VideoCameraIcon, PlusIcon } from '../icons';
import classNames from 'classnames';
import { mergeStyles, isVideoUrl, TextInput, CloseIcon, Button, WixUtils } from 'wix-rich-content-common';
import styles from '../../statics/styles/video-selection-input-modal.scss';

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
    const { theme, t, handleFileSelection, enableCustomUploadOnMobile } = this.props;
    const { styles } = this;
    const uploadModalSection =
      <div>
        <div className={styles.video_modal_or_upload_video_fro}>Or, upload video from your computer</div>
        <div className={styles.video_modal_upload_video}><div onClick={handleFileSelection}><PlusIcon /> Upload video</div></div>
      </div>;
    console.log(this.props);
    return (
      <div>
        <div className={styles.video_modal_custom_container} data-hook="videoUploadModal">
          {!WixUtils.isMobile() && <CloseIcon className={classNames(styles.video_modal_closeIcon)} onClick={() => this.onCloseRequested()} />}
          <div className={styles.video_modal_add_a_Video}>Add a Video</div>
          <div role="heading" aria-labelledby="video_modal_hdr" className={classNames(styles.video_modal_header)}>
            <h3 id="video_modal_hdr" className={styles.video_modal_custom_header_text}>
              {t('VideoUploadModal_Header')}
            </h3>
          </div>
          <div>
            <div className={styles.video_modal_custom_textInput}>
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
            <Button className={styles.video_modal_add_button} onClick={() => this.onConfirm()} ariaProps={!this.state.url && { disabled: 'disabled' }}>Add Now</Button>
          </div>
          {
            WixUtils.isMobile() ?
              (handleFileSelection && enableCustomUploadOnMobile &&
                uploadModalSection) : handleFileSelection && uploadModalSection
          }
        </div>
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
