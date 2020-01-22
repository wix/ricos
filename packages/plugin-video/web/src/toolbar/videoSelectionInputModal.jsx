import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TextInput, CloseIcon, Button } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';
import ReactPlayer from 'react-player';
import styles from '../../statics/styles/video-selection-input-modal.scss';

export default class VideoSelectionInputModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { componentData } = this.props;
    this.state = {
      url: (!componentData.isCustomVideo && componentData.src) || '',
      errorMsg: '',
    };
    this.id = `VideoUploadModal_FileInput_${Math.floor(Math.random() * 9999)}`;
  }

  onUrlChange = e => {
    const url = e.target.value;
    this.setState({ url });
  };

  afterOpenModal = () => this.input.focus();

  updateComponentData = () => {
    const { componentData, helpers, pubsub, onConfirm } = this.props;
    const src = this.state.url;
    if (onConfirm) {
      onConfirm({ ...componentData, src });
    } else {
      pubsub.update('componentData', { src });
    }

    if (helpers && helpers.onVideoSelected) {
      helpers.onVideoSelected(src, data =>
        pubsub.update('componentData', { metadata: { ...data } })
      );
    }
    this.closeModal();
  };

  loadLocalVideoFromFile = file => {
    const src = URL.createObjectURL(file);
    const { componentData, pubsub, onConfirm } = this.props;
    if (onConfirm) {
      onConfirm({ ...componentData, src, isCustomVideo: true });
    } else {
      pubsub.update('componentData', { src, isCustomVideo: true });
    }
  };

  closeModal = () => {
    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.updateComponentData();
      this.closeModal();
    }
  };

  //These two function needed to handle onFocus select for iphone devices
  componentDidMount() {
    this.input.focus();
    this.input.setSelectionRange(0, this.input.value.length);
  }

  render() {
    const { url, submitted, errorMsg } = this.state;
    const {
      t,
      handleFileSelection,
      handleFileUpload,
      enableCustomUploadOnMobile,
      isMobile,
      languageDir,
      componentData,
      onVideoUpdate,
    } = this.props;
    const { styles } = this;
    const hasCustomFileUpload = handleFileUpload || handleFileSelection;
    let handleClick, handleChange;
    if (handleFileUpload) {
      handleChange = () => {
        this.loadLocalVideoFromFile(this.inputFile.files[0]);
        this.closeModal();
        handleFileUpload(this.inputFile.files[0], ({ data, error }) =>
          onVideoUpdate({ data, error }, componentData, true)
        );
      };
    } else if (handleFileSelection) {
      handleClick = evt => {
        evt.preventDefault();
        return handleFileSelection(
          ({ data, error }) => onVideoUpdate({ data, error }, componentData, true),
          () => this.closeModal()
        );
      };
    }
    const uploadVideoSection = (
      <div>
        <div className={styles.video_modal_or_upload_video_from}>
          {t('VideoUploadModal_CustomVideoHeader')}
        </div>
        <div className={styles.video_modal_upload_video}>
          <input
            id={this.id}
            type="file"
            accept="video/*"
            className={styles.fileInput}
            ref={node => (this.inputFile = node)}
            onClick={handleClick}
            onChange={handleChange}
          />
          <label
            htmlFor={this.id}
            className={styles.fileInputLabel}
            role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
            data-hook="videoUploadModalCustomVideo"
            tabIndex={0}
          >
            + {t('VideoUploadModal_CustomVideoClickText')}
          </label>
          {errorMsg.length > 0 && <div className={styles.video_modal_error_msg}>{errorMsg}</div>}
        </div>
      </div>
    );
    return (
      <div dir={languageDir}>
        <div
          className={styles[`video_modal_container_${hasCustomFileUpload ? 'big' : 'small'}`]}
          data-hook="videoUploadModal"
        >
          {!isMobile && (
            <CloseIcon className={styles.video_modal_closeIcon} onClick={() => this.closeModal()} />
          )}
          <h2 className={styles.video_modal_add_a_Video}>{t('VideoUploadModal_Title')}</h2>
          <div
            role="heading"
            aria-labelledby="video_modal_hdr"
            className={styles.video_modal_header}
          >
            <h3 id="video_modal_hdr" className={styles.video_modal_header_text}>
              {t('VideoUploadModal_Header')}
            </h3>
          </div>
          <div>
            <div
              className={
                styles[`video_modal_textInput_${hasCustomFileUpload ? 'customWidth' : 'fullWidth'}`]
              }
            >
              <TextInput
                inputRef={ref => {
                  this.input = ref;
                }}
                type="url"
                onKeyPress={this.handleKeyPress}
                onChange={this.onUrlChange}
                value={url}
                error={
                  !ReactPlayer.canPlay(url) && submitted
                    ? t('VideoUploadModal_Input_InvalidUrl')
                    : null
                }
                placeholder={t('VideoUploadModal_Input_Placeholder')}
                theme={styles}
                data-hook="videoUploadModalInput"
              />
            </div>
            <Button
              className={
                styles[`video_modal_add_button_${hasCustomFileUpload ? 'inline' : 'inMiddle'}`]
              }
              onClick={() => {
                this.updateComponentData();
              }}
              ariaProps={!this.state.url && { disabled: 'disabled' }}
              dataHook="videoUploadModalAddButton"
              theme={styles}
            >
              {t('VideoUploadModal_AddButtonText')}
            </Button>
          </div>
          {(!isMobile || enableCustomUploadOnMobile) && hasCustomFileUpload && uploadVideoSection}
        </div>
      </div>
    );
  }
}

VideoSelectionInputModal.propTypes = {
  onConfirm: PropTypes.func,
  onVideoUpdate: PropTypes.func,
  pubsub: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  url: PropTypes.string,
  theme: PropTypes.object.isRequired,
  doneLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  t: PropTypes.func,
  handleFileSelection: PropTypes.func,
  handleFileUpload: PropTypes.func,
  enableCustomUploadOnMobile: PropTypes.bool,
  isMobile: PropTypes.bool,
  languageDir: PropTypes.string,
};
