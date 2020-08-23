import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginImage } from 'wix-rich-content-plugin-image';
import PropTypes from 'prop-types';

const ImageEditor = ({ content, handleFileUpload }) => (
  <RicosEditor plugins={[pluginImage()]} content={content}>
    <RichContentEditor helpers={{ handleFileUpload }} />
  </RicosEditor>
);

ImageEditor.propTypes = {
  content: PropTypes.object,
  handleFileUpload: PropTypes.func,
};

export default ImageEditor;
