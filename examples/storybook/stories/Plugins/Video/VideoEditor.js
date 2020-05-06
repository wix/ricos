import React from 'react';
import { RicosEditor } from 'wix-rich-content-wrapper';
import { pluginVideo } from 'wix-rich-content-plugin-video';
import PropTypes from 'prop-types';

const Editor = ({ contentState, handleFileUpload }) => (
  <RicosEditor plugins={[pluginVideo({ handleFileUpload })]} contentState={contentState} />
);

Editor.propTypes = {
  contentState: PropTypes.object,
  handleFileUpload: PropTypes.func,
};

export default Editor;
