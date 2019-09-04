import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImageEditorLogic extends Component {
  componentDidMount() {
    const { mediaImageStudio, fileId, helpers, mediaImageStudioEvents, pubsub } = this.props;

    const imageDataSubscription = mediaImageStudio.once(mediaImageStudioEvents.ImageData, imageData => {
      const reader = new FileReader();
      const handleImageEdit = pubsub.getBlockHandler('handleImageEdit');
      reader.onload = e => handleImageEdit(e.target.result);
      reader.readAsDataURL(imageData);
      helpers.closeModal();
    });

    mediaImageStudio.once(mediaImageStudioEvents.Close, () => {
      imageDataSubscription.remove();
      helpers.closeModal();
    });

    mediaImageStudio.show({
      fileId
    });
  }

  componentWillUnmount() {
    this.props.mediaImageStudio.kill();
  }

  render() {
    return null;
  }
}

ImageEditorLogic.propTypes = {
  mediaImageStudio: PropTypes.object.isRequired,
  mediaImageStudioEvents: PropTypes.object.isRequired,
  fileId: PropTypes.string.isRequired,
  helpers: PropTypes.object.isRequired,
  pubsub: PropTypes.any,
};

export default ImageEditorLogic;
