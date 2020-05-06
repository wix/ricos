import React from 'react';
import { RicosEditor } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginImage } from 'wix-rich-content-plugin-image';
import PropTypes from 'prop-types';

const ImageEditor = ({ contentState, onFilesChange }) => (
  <RicosEditor plugins={[pluginImage()]} contentState={contentState}>
    <RichContentEditor helpers={{ onFilesChange }} />
  </RicosEditor>
);

ImageEditor.propTypes = {
  contentState: PropTypes.object,
  onFilesChange: PropTypes.func,
};

export default ImageEditor;
