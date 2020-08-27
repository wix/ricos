import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { pluginVideo } from 'wix-rich-content-plugin-video';
import { pluginImage } from 'wix-rich-content-plugin-image';
import { pluginGallery } from 'wix-rich-content-plugin-gallery';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload';
import { RichContentEditor } from 'wix-rich-content-editor';
import PropTypes from 'prop-types';

function getPlugins(handleVideoUpload, handleFileUpload) {
  return [
    pluginImage(),
    pluginVideo({ handleFileUpload: handleVideoUpload }),
    pluginGallery(),
    pluginFileUpload({ onFileSelected: handleFileUpload }),
  ];
}

const MediaEditor = ({ content, handleFileUpload, handleVideoUpload, handleImageUpload }) => (
  <RicosEditor plugins={getPlugins(handleVideoUpload, handleFileUpload)} content={content}>
    <RichContentEditor helpers={{ handleFileSelection: handleImageUpload }} />
  </RicosEditor>
);

MediaEditor.propTypes = {
  content: PropTypes.object,
  handleFileUpload: PropTypes.func,
  handleVideoUpload: PropTypes.func,
  handleImageUpload: PropTypes.func,
};

export default MediaEditor;
