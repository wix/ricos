import React from 'react';
import { WixRichContentEditor } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginVideo } from 'wix-rich-content-plugin-video';
import PropTypes from 'prop-types';

const Editor = ({ editorState, handleFileUpload }) => (
  <WixRichContentEditor plugins={[pluginVideo({ handleFileUpload })]}>
    <RichContentEditor editorState={editorState} />
  </WixRichContentEditor>
);

Editor.propTypes = {
  editorState: PropTypes.object,
  handleFileUpload: PropTypes.func,
};

export default Editor;
