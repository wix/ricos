import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload';
import PropTypes from 'prop-types';

const FileUploadEditor = ({ content, onFilesChange }) => {
  const config = {
    onFileSelected: onFilesChange,
  };
  return (
    <RicosEditor plugins={[pluginFileUpload(config)]} content={content}>
      <RichContentEditor />
    </RicosEditor>
  );
};

FileUploadEditor.propTypes = {
  content: PropTypes.object,
  onFilesChange: PropTypes.func,
};

export default FileUploadEditor;
