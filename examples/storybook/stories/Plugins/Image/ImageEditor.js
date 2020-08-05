import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { pluginImage } from 'wix-rich-content-plugin-image';
import PropTypes from 'prop-types';

const ImageEditor = ({ content, handleFileUpload }) => (
  <RicosEditor plugins={[pluginImage({ handleFileUpload })]} content={content} />
);

ImageEditor.propTypes = {
  content: PropTypes.object,
  handleFileUpload: PropTypes.func,
};

export default ImageEditor;
