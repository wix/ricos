import React from 'react';
import { RicosEditor } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginImage } from 'wix-rich-content-plugin-image';
import PropTypes from 'prop-types';

const ImageEditor = ({ editorState, onFilesChange }) => (
  <RicosEditor plugins={[pluginImage()]}>
    <RichContentEditor editorState={editorState} helpers={{ onFilesChange }} />
  </RicosEditor>
);

ImageEditor.propTypes = {
  editorState: PropTypes.object,
  onFilesChange: PropTypes.func,
};

export default ImageEditor;
