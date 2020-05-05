import React from 'react';
import { RicosEditor } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginVideo } from 'wix-rich-content-plugin-video';
import PropTypes from 'prop-types';

const Editor = ({ editorState, handleFileUpload }) => (
  <RicosEditor plugins={[pluginVideo({ handleFileUpload })]}>
    <RichContentEditor editorState={editorState} />
  </RicosEditor>
);

Editor.propTypes = {
  editorState: PropTypes.object,
  handleFileUpload: PropTypes.func,
};

export default Editor;
