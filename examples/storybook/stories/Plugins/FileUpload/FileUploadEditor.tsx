import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos/editor';
import { RichContentEditor } from 'ricos/editor';
import { pluginFileUpload } from 'ricos/file/editor';

const FileUploadEditor: FunctionComponent<{
  content?: RicosContent;
  onFilesChange: (files, updateEntity) => void;
}> = ({ content, onFilesChange }) => {
  const config = {
    onFileSelected: onFilesChange,
  };
  return (
    <RicosEditor plugins={[pluginFileUpload(config)]} content={content}>
      <RichContentEditor />
    </RicosEditor>
  );
};

export default FileUploadEditor;
