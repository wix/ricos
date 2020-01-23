import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TextInput, CloseIcon, Button } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';
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
    this.setState({ url, showError: false });
  };

  onUrlVideoSelection = () => {
    const { componentData, helpers, onConfirm, checkUrlValidity } = this.props;
    const { url: src } = this.state;
    if (!checkUrlValidity(src)) {
      this.setState({ showError: true });
      return;
    }
    onConfirm({ ...componentData, src });

    helpers?.onVideoSelected?.(src, data => this.updateComponentData({ metadata: { ...data } }));
    this.closeModal();
  };

  onUrlInputDoubleClick = () => {
    this.setState({ url: 'https://www.youtube.com/watch?v=vzKryaN44ss' });
  };

  closeModal = () => {
    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onUrlVideoSelection();
    }
  };

  //These two function needed to handle onFocus select for iphone devices
  componentDidMount() {
    this.input.focus();
    this.input.setSelectionRange(0, this.input.value.length);
  }

  loadLocalVideo = file => {
    const src = URL.createObjectURL(file);
    const { componentData, onConfirm } = this.props;
    onConfirm({ ...componentData, src, isCustomVideo: true });
  };

  updateVideoComponent = ({ data }, componentData, isCustomVideo = false) => {
    const { pathname, thumbnail, url } = data;
    const src = pathname ? { pathname, thumbnail } : url;
    this.updateComponentData({ src, isCustomVideo });
  };

  addVideoComponent = ({ data }, componentData, isCustomVideo = false) => {
    const { onConfirm } = this.props;
    const { pathname, thumbnail, url } = data;
    const src = pathname ? { pathname, thumbnail } : url;
    onConfirm({ ...componentData, src, isCustomVideo });
  };

  updateComponentData = data => {
    this.props.pubsub.update('componentData', data);
  };

  handleNativeFileUpload = () => {
    const { componentData, handleFileUpload: consumerHandleFileUpload } = this.props;
    const file = this.inputFile.files[0];
    this.loadLocalVideo(file);
    consumerHandleFileUpload(file, ({ data, error }) =>
      this.updateVideoComponent({ data, error }, componentData, true)
    );
    this.closeModal();
  };

  render() {
    const { url, showError, errorMsg } = this.state;
    const {
      t,
      handleFileSelection,
      handleFileUpload,
      enableCustomUploadOnMobile,
      isMobile,
      languageDir,
      componentData,
    } = this.props;
    const { styles } = this;
    const hasCustomFileUpload = handleFileUpload || handleFileSelection;
    let handleClick;
    if (handleFileSelection) {
      handleClick = evt => {
        evt.preventDefault();
        return handleFileSelection(({ data, error }) => {
          this.addVideoComponent({ data, error }, componentData, true);
          this.closeModal();
        });
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
            onChange={this.handleNativeFileUpload}
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
                onDoubleClick={this.onUrlInputDoubleClick}
                value={url}
                error={showError ? t('VideoUploadModal_Input_InvalidUrl') : null}
                placeholder={t('VideoUploadModal_Input_Placeholder')}
                theme={styles}
                data-hook="videoUploadModalInput"
              />
            </div>
            <Button
              className={
                styles[`video_modal_add_button_${hasCustomFileUpload ? 'inline' : 'inMiddle'}`]
              }
              onClick={this.onUrlVideoSelection}
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
  onNativeVideoUpload: PropTypes.func.isRequired,
  checkUrlValidity: PropTypes.func,
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
