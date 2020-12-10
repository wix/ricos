import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { pluginVideo } from 'wix-rich-content-plugin-video/viewer';
import { pluginImage } from 'wix-rich-content-plugin-image/viewer';
import { pluginGallery } from 'wix-rich-content-plugin-gallery/viewer';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload/viewer';
import PropTypes from 'prop-types';

function getPlugins() {
  return [pluginImage(), pluginVideo(), pluginGallery(), pluginFileUpload()];
}

const MediaViewer = ({ content }) => <RicosViewer plugins={getPlugins()} content={content} />;

MediaViewer.propTypes = {
  content: PropTypes.object,
};

export default MediaViewer;
