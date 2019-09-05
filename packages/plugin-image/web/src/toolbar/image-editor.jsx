import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadImageStudioOpenerPackage } from '../image-studio-opener';
import ImageEditorLogic from './image-editor-logic';

class ImageEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaImageStudio: undefined,
      mediaImageStudioEvents: undefined
    };

    // This is script loading warmup
    loadImageStudioOpenerPackage();
  }

  componentDidMount() {
    loadImageStudioOpenerPackage(pkg => {
      this.setState({
        mediaImageStudio: this.createMediaImageStudio(pkg.MediaImageStudio),
        mediaImageStudioEvents: pkg.MediaImageStudioEvents
      });
    });
  }

  createMediaImageStudio = (MediaImageStudio) => {
    const { settings: { imageEditorWixSettings } } = this.props;
    const { siteToken, metasiteId, initiator, mediaRoot } = imageEditorWixSettings;

    const mediaImageStudio = new MediaImageStudio({
      siteToken,
      metasiteId,
      initiator,
      mediaRoot,
    });

    return mediaImageStudio;
  };

  render() {
    const { mediaImageStudio, mediaImageStudioEvents } = this.state;
    const { componentData: { src }, helpers, pubsub } = this.props;

    if (!mediaImageStudio || !src || !mediaImageStudioEvents) {
      return null;
    }

    return (
      <ImageEditorLogic
        mediaImageStudio={mediaImageStudio}
        mediaImageStudioEvents={mediaImageStudioEvents}
        fileId={src.file_name}
        helpers={helpers}
        pubsub={pubsub}
      />
    );
  }
}
ImageEditor.propTypes = {
  settings: PropTypes.object.isRequired,
  componentData: PropTypes.any.isRequired,
  helpers: PropTypes.object,
  pubsub: PropTypes.any
};

export default ImageEditor;
