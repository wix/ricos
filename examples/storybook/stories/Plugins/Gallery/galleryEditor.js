import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginGallery } from 'wix-rich-content-plugin-gallery';
import PropTypes from 'prop-types';

const GalleryEditor = ({ content, onFilesChange }) => (
  <RicosEditor plugins={[pluginGallery()]} content={content}>
    <RichContentEditor helpers={{ onFilesChange }} />
  </RicosEditor>
);

GalleryEditor.propTypes = {
  content: PropTypes.object,
  onFilesChange: PropTypes.func,
};

export default GalleryEditor;
