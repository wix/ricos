import React, { FunctionComponent } from 'react';
import { RicosContent, RicosViewer } from 'ricos/viewer';
import { pluginFileUpload } from 'ricos/file-upload/dist/module.viewer';

const FileUploadViewer: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosViewer content={content} plugins={[pluginFileUpload()]} />
);

export default FileUploadViewer;
