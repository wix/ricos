import React, { FunctionComponent } from 'react';
import { DraftContent, RicosViewer } from 'ricos-viewer';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload/dist/module.viewer';

const FileUploadViewer: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosViewer content={content} plugins={[pluginFileUpload()]} />
);

export default FileUploadViewer;
