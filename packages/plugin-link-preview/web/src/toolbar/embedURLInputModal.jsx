import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { UrlInputModal } from 'wix-rich-content-plugin-commons';
import { DEFAULTS } from '../defaults';

export default class EmbedURLInputModal extends Component {
  constructor(props) {
    super(props);
    const { componentData } = this.props;
    this.state = {
      url: componentData?.config?.link?.url || '',
      submittedInvalidUrl: false,
    };
  }

  onConfirm = () => {
    const { url } = this.state;
    if (url) {
      const { componentData, pubsub, onConfirm, helpers } = this.props;
      const { fetchData } = componentData;
      fetchData(url).then(({ html }) => {
        if (!html) {
          this.setState({ submittedInvalidUrl: true });
        } else {
          if (onConfirm) {
            const { config } = DEFAULTS;
            onConfirm({
              ...componentData,
              html,
              config: {
                ...config,
                width: 350,
                link: { ...config.link, url },
              },
            });
          } else {
            pubsub.update('componentData', { url, html });
          }
          helpers.closeModal();
        }
      });
    }
  };

  render() {
    const { url, submittedInvalidUrl } = this.state;
    const {
      t,
      languageDir,
      componentData: { socialType },
      helpers,
    } = this.props;

    return (
      <UrlInputModal
        onConfirm={this.onConfirm}
        helpers={helpers}
        input={url}
        t={t}
        languageDir={languageDir}
        title={t(`EmbedURL_Social_${socialType}_Title`)}
        submittedInvalidUrl={submittedInvalidUrl}
        dataHook={'socialEmbedUploadModal'}
        onInputChange={url => this.setState({ url })}
        errorMessage={t('SoundCloudUploadModal_Input_InvalidUrl')}
        placeholder={t(`EmbedURL_Social_${socialType}_Placeholder`)}
        onCloseRequested={helpers.closeModal}
      />
    );
  }
}

EmbedURLInputModal.propTypes = {
  onConfirm: PropTypes.func,
  pubsub: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  t: PropTypes.func,
  languageDir: PropTypes.string,
};
