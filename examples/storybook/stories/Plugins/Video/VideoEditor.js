import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { pluginVideo } from 'wix-rich-content-plugin-video';
import PropTypes from 'prop-types';

const Editor = ({ content, handleFileUpload }) => (
  <RicosEditor plugins={[pluginVideo({ handleFileUpload })]} content={content} />
);

Editor.propTypes = {
  content: PropTypes.object,
  handleFileUpload: PropTypes.func,
};

export default Editor;
