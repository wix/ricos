import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  MediaImageStudio,
  MediaImageStudioEvents,
} from '@wix/media-image-studio-opener/dist/src';

class ImageSettings extends Component {
  constructor(props) {
    super(props);

    this.initMediaImageStudio();
  }

  componentDidMount() {
    const { componentData: { src } } = this.props;

    if (!src) {
      return;
    }

    this.mediaImageStudio.show({
      fileId: `${src.file_name}`,
    });
  }

  componentWillUnmount() {
    // TODO: implement
  }

  /*revertComponentData() {
    const { componentData, helpers, pubsub } = this.props;
    if (this.initialState) {
      const initialComponentData = Object.assign({}, componentData, { ...this.initialState });
      pubsub.update('componentData', initialComponentData);
      this.setState({ ...this.initialState });
    }
    helpers.closeModal();
  }

  metadataUpdated = (metadata, value) => {
    const updatedMetadata = Object.assign({}, metadata, value);
    this.setState({ metadata: updatedMetadata });
  };

  addMetadataToBlock = () => {
    const { pubsub } = this.props;
    const metadata = this.state.metadata || {};
    pubsub.update('componentData', { metadata });
  };

  onDoneClick = () => {
    const { helpers } = this.props;
    this.saveLink();
    if (this.state.metadata) {
      this.addMetadataToBlock();
    }
    helpers.closeModal();
  };

  saveLink = () => {
    const { linkPanelValues } = this.state;
    if (linkPanelValues.url === '') {
      this.setBlockLink(null);
    } else if (linkPanelValues.isValid) {
      this.setBlockLink(linkPanelValues);
    }
  };

  setBlockLink = item => this.props.pubsub.setBlockData({ key: 'componentLink', item });

  onLinkPanelChange = linkPanelValues => {
    this.setState({ linkPanelValues });
  };*/

  initMediaImageStudio = () => {
    if (this.mediaImageStudio) {
      this.mediaImageStudio.kill();
    }

    this.mediaImageStudio = this.createMediaImageStudio();
  };

  createMediaImageStudio = () => {
    const { settings: { siteToken, metasiteId, initiator, mediaRoot }, helpers } = this.props;
    /*const {
      appVersion,
      saveStrategy,
      segmentationType,
      locale,
      blogInstanceToken,
    } = this.state;*/

    const mediaImageStudio = new MediaImageStudio({
      siteToken,
      metasiteId,
      initiator,
      mediaRoot,
      // saveStrategy -- use default
    });

    mediaImageStudio.once(MediaImageStudioEvents.ImageData, imageData => {
      // pubsub.update('componentData', initialComponentData);
      console.log('imageData', imageData);

      const hasFileChangeHelper = helpers && helpers.onFilesChange;
      if (hasFileChangeHelper) {
        helpers.onFilesChange(file, ({ data }) => this.handleFilesAdded({ data, itemIdx }));
      } else {
        console.warn('Missing upload function'); //eslint-disable-line no-console
      }
      mediaImageStudio.hide();
    });

    mediaImageStudio.once(MediaImageStudioEvents.Close, () => {
      console.log('Closed !!!');
      helpers.closeModal();
    });

    return mediaImageStudio;
  };

  render() {
    return null;
  }
}
ImageSettings.propTypes = {
  siteToken: PropTypes.string,

  componentData: PropTypes.any.isRequired,
  helpers: PropTypes.object,
  theme: PropTypes.object.isRequired,
  pubsub: PropTypes.any,
  t: PropTypes.func,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  isMobile: PropTypes.bool,
  uiSettings: PropTypes.object,
  languageDir: PropTypes.string,
};

export default ImageSettings;
