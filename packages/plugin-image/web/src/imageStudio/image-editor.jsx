import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { setupImageEditor } from './image-editor-logic';

class ImageEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaImageStudio: undefined,
      mediaImageStudioEvents: undefined,
    };

    const {
      componentData: { src },
      helpers,
      pubsub,
      imageEditorWixSettings,
      onImageEditorOpen,
    } = this.props;

    const onSave = file => {
      pubsub.getBlockHandler('handleFilesSelected')([file]);
      onClose();
    };

    const onClose = () => {
      helpers.closeModal();
    };

    onImageEditorOpen && onImageEditorOpen();

    this.id = 'imageEditor';
    setupImageEditor(imageEditorWixSettings, this.id, src.file_name, onSave, onClose);
  }

  render() {
    return <div id={this.id} nofocus="true" />;
  }
}

ImageEditor.propTypes = {
  imageEditorWixSettings: PropTypes.shape({
    siteToken: PropTypes.string,
    metaSiteId: PropTypes.string,
    initiator: PropTypes.string,
    mediaRoot: PropTypes.string,
  }).isRequired,
  onImageEditorOpen: PropTypes.func,
  componentData: PropTypes.any.isRequired,
  helpers: PropTypes.object,
  pubsub: PropTypes.any,
};

export default ImageEditor;
