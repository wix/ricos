import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { pluginVideo } from 'wix-rich-content-plugin-video';
import { pluginImage } from 'wix-rich-content-plugin-image';
import { pluginGallery } from 'wix-rich-content-plugin-gallery';
import { RichContentEditor } from 'wix-rich-content-editor';
import PropTypes from 'prop-types';

function getPlugins(handleVideoUpload) {
  return [pluginImage(), pluginVideo({ handleFileUpload: handleVideoUpload }), pluginGallery()];
}

const MediaEditor = ({ content, handleFileUpload, handleVideoUpload }) => (
  <RicosEditor plugins={getPlugins(handleVideoUpload)} content={content}>
    <RichContentEditor helpers={{ handleFileUpload }} />
  </RicosEditor>
);

MediaEditor.propTypes = {
  content: PropTypes.object,
  handleFileUpload: PropTypes.func,
  handleVideoUpload: PropTypes.func,
};

export default MediaEditor;
