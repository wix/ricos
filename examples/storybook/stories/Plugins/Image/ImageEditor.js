import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginImage } from 'wix-rich-content-plugin-image';
import PropTypes from 'prop-types';

const ImageEditor = ({ content, onFilesChange }) => (
  <RicosEditor plugins={[pluginImage()]} content={content}>
    <RichContentEditor helpers={{ onFilesChange }} />
  </RicosEditor>
);

ImageEditor.propTypes = {
  content: PropTypes.object,
  onFilesChange: PropTypes.func,
};

export default ImageEditor;
