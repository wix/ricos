import React from 'react';
import { RichContentWrapper } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginImage } from 'wix-rich-content-plugin-image';
import PropTypes from 'prop-types';

const ImageEditor = ({ editorState, onFilesChange }) => (
  <RichContentWrapper plugins={[pluginImage()]} isEditor>
    <RichContentEditor editorState={editorState} helpers={{ onFilesChange }} />
  </RichContentWrapper>
);

ImageEditor.propTypes = {
  editorState: PropTypes.object,
  onFilesChange: PropTypes.func,
};

export default ImageEditor;
