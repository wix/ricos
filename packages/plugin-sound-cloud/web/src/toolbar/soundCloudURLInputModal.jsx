import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { SoundCloudIcon } from '../icons';
import classNames from 'classnames';
import {
  mergeStyles,
  isSoundCloudUrl,
  SettingsPanelFooter,
  TextInput,
  CloseIcon,
} from 'wix-rich-content-common';
import styles from '../../statics/styles/sound-cloud-url-input-modal.scss';

export default class SoundCloudURLInputModal extends Component {
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
    if (url && isSoundCloudUrl(url)) {
      const { componentData, helpers, pubsub, onConfirm } = this.props;
      if (onConfirm) {
        onConfirm({ ...componentData, src: url });
      } else {
        pubsub.update('componentData', { src: url });
      }

      if (helpers && helpers.onVideoSelected) {
        helpers.onVideoSelected(url, data =>
          pubsub.update('componentData', { metadata: { ...data } })
        );
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
    if (e.charCode === 27) {
      this.onCloseRequested();
    }
  };

  //This function needed to handle onFocus select for iphone devices
  componentDidMount() {
    this.input.focus();
    this.input.setSelectionRange(0, this.input.value.length);
  }

  render() {
    const { url, submitted } = this.state;
    const { doneLabel, cancelLabel, t, isMobile, languageDir } = this.props;
    const { styles } = this;

    return (
      <div className={styles.container} data-hook="soundCloudUploadModal" dir={languageDir}>
        {!isMobile && (
          <CloseIcon
            className={classNames(styles.closeIcon)}
            onClick={() => this.onCloseRequested()}
          />
        )}
        <div
          role="heading"
          aria-labelledby="sound_cloud_modal_hdr"
          className={classNames(styles.header)}
        >
          <SoundCloudIcon className={classNames(styles.header_icon)} />
          <h3 id="sound_cloud_modal_hdr" className={styles.header_text}>
            {!isMobile
              ? t('SoundCloudUploadModal_Header')
              : t('SoundCloudUploadModal_Header_Mobile')}
          </h3>
        </div>
        <div className={styles.soundCloudUrlInputModal_textInput}>
          <TextInput
            inputRef={ref => {
              this.input = ref;
            }}
            type="url"
            onKeyPress={this.handleKeyPress}
            onChange={this.onUrlChange}
            value={url}
            error={
              !isSoundCloudUrl(url) && submitted
                ? t('SoundCloudUploadModal_Input_InvalidUrl')
                : null
            }
            placeholder={t('SoundCloudUploadModal_Input_Placeholder')}
            theme={styles}
            data-hook="soundCloudUploadModalInput"
          />
        </div>
        <SettingsPanelFooter
          className={styles.modal_footer}
          save={() => this.onConfirm()}
          cancel={() => this.onCloseRequested()}
          saveLabel={doneLabel}
          cancelLabel={cancelLabel}
          theme={styles}
          t={t}
        />
      </div>
    );
  }
}

SoundCloudURLInputModal.propTypes = {
  onConfirm: PropTypes.func,
  pubsub: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  url: PropTypes.string,
  theme: PropTypes.object.isRequired,
  doneLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  languageDir: PropTypes.string,
};

SoundCloudURLInputModal.defaultProps = {
  doneLabel: 'Add Now',
  cancelLabel: 'Cancel',
};
