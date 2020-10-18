import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { pluginVideo } from 'wix-rich-content-plugin-video/dist/module.viewer';
import { pluginImage } from 'wix-rich-content-plugin-image/dist/module.viewer';
import { pluginGallery } from 'wix-rich-content-plugin-gallery/dist/module.viewer';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload/dist/module.viewer';
import PropTypes from 'prop-types';

function getPlugins(handleVideoUpload, handleFileUpload) {
  return [pluginImage(), pluginVideo(), pluginGallery(), pluginFileUpload()];
}

const MediaViewer = ({ content, handleFileUpload, handleVideoUpload, handleImageUpload }) => (
  <RicosViewer plugins={getPlugins(handleVideoUpload, handleFileUpload)} content={content} />
);

MediaViewer.propTypes = {
  content: PropTypes.object,
  handleFileUpload: PropTypes.func,
  handleVideoUpload: PropTypes.func,
  handleImageUpload: PropTypes.func,
};

export default MediaViewer;
