import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { SettingsPanelFooter, TextInput, CloseIcon } from 'wix-rich-content-editor-common';
import styles from '../../statics/styles/embed-url-input-modal.scss';
import { isValidUrl } from 'wix-rich-content-common';

export default class embedURLInputModal extends Component {
  constructor(props) {
    super(props);
    const { componentData } = this.props;
    this.state = {
      url: componentData?.config?.link?.url || '',
    };
  }

  onUrlChange = event => {
    const url = event.target.value;
    this.setState({ url });
  };

  onConfirm = () => {
    const { url } = this.state;
    if (url) {
      const { componentData, pubsub, onConfirm } = this.props;
      const { fetchData } = componentData;
      fetchData(url).then(({ html }) => {
        if (!isValidUrl(url)) {
          this.setState({ submittedInvalidUrl: true });
        } else {
          if (onConfirm) {
            onConfirm({
              ...componentData,
              html,
              config: { ...componentData?.config, link: { ...componentData?.config?.link, url } },
            });
          } else {
            pubsub.update('componentData', { url, html });
          }
          this.onCloseRequested();
        }
      });
    } else {
      this.setState({ submitted: true });
    }
  };

  onCloseRequested = () => {
    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };

  handleKeyPress = event => {
    if (event.charCode === 13) {
      this.onConfirm();
    }
    if (event.charCode === 27) {
      this.onCloseRequested();
    }
  };

  componentDidMount() {
    this.input.focus();
    this.input.setSelectionRange(0, this.input.value.length);
  }

  render() {
    const { url, submittedInvalidUrl } = this.state;
    const {
      t,
      languageDir,
      componentData: { socialType },
    } = this.props;
    return (
      <div
        className={styles.socialEmbed_urlInput_container}
        data-hook="socialEmbedUploadModal"
        dir={languageDir}
      >
        <CloseIcon
          className={classNames(styles.socialEmbed_urlInput_closeIcon)}
          onClick={() => this.onCloseRequested()}
        />
        <div className={classNames(styles.socialEmbed_urlInput_header)}>
          <div className={styles.socialEmbed_urlInput_header_text}>
            {t(`EmbedURL_Social_${socialType}_Title`)}
          </div>
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
            error={submittedInvalidUrl && t('SoundCloudUploadModal_Input_InvalidUrl')}
            placeholder={t(`EmbedURL_Social_${socialType}_Placeholder`)}
            theme={styles}
            data-hook="socialEmbedUploadModalInput"
          />
        </div>
        <SettingsPanelFooter
          className={styles.socialEmbed_urlInput_modal_footer}
          save={() => this.onConfirm()}
          cancel={() => this.onCloseRequested()}
          saveLabel={t('EmbedURL_Common_CTA_Primary')}
          cancelLabel={t('EmbedURL_Common_CTA_Secondary')}
          theme={styles}
          t={t}
        />
      </div>
    );
  }
}

embedURLInputModal.propTypes = {
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

embedURLInputModal.defaultProps = {
  doneLabel: 'Add Now',
  cancelLabel: 'Cancel',
};
