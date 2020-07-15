import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload/dist/module.viewer';
import PropTypes from 'prop-types';

const FileUploadViewer = ({ content }) => (
  <RicosViewer content={content} plugins={[pluginFileUpload()]} />
);

FileUploadViewer.propTypes = {
  content: PropTypes.object,
};

export default FileUploadViewer;
