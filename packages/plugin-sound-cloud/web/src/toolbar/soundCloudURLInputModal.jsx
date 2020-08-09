import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { UrlInputModal } from 'wix-rich-content-editor-common';

export default class SoundCloudURLInputModal extends Component {
  constructor(props) {
    super(props);
    const { componentData } = this.props;
    this.state = {
      url: componentData.src || '',
      submittedInvalidUrl: false,
    };
  }

  onConfirm = () => {
    const { url } = this.state;
    if (url && ReactPlayer.canPlay(url)) {
      const { componentData, helpers, onVideoSelected, pubsub, onConfirm } = this.props;
      if (onConfirm) {
        onConfirm({ ...componentData, src: url });
      } else {
        pubsub.update('componentData', { src: url });
      }

      if (onVideoSelected) {
        onVideoSelected(url, data => pubsub.update('componentData', { metadata: { ...data } }));
      }

      helpers.closeModal();
    } else {
      this.setState({ submittedInvalidUrl: true });
    }
  };

  render() {
    const { url, submittedInvalidUrl } = this.state;
    const { t, isMobile, languageDir, helpers } = this.props;

    return (
      <UrlInputModal
        onConfirm={this.onConfirm}
        helpers={helpers}
        input={url}
        t={t}
        languageDir={languageDir}
        title={
          !isMobile ? t('SoundCloudUploadModal_Header') : t('SoundCloudUploadModal_Header_Mobile')
        }
        submittedInvalidUrl={submittedInvalidUrl}
        dataHook={'soundCloudUploadModal'}
        onInputChange={url => this.setState({ url })}
        errorMessage={t('SoundCloudUploadModal_Input_InvalidUrl')}
        placeholder={t('SoundCloudUploadModal_Input_Placeholder')}
        onCloseRequested={helpers.closeModal}
      />
    );
  }
}

SoundCloudURLInputModal.propTypes = {
  onConfirm: PropTypes.func,
  pubsub: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  onVideoSelected: PropTypes.func.isRequired,
  componentData: PropTypes.object.isRequired,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  languageDir: PropTypes.string,
};
