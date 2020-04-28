import React from 'react';
import { RichContentWrapper } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginVideo } from 'wix-rich-content-plugin-video';
import PropTypes from 'prop-types';

const Editor = ({ editorState, handleFileUpload }) => (
  <RichContentWrapper plugins={[pluginVideo({ handleFileUpload })]} isEditor>
    <RichContentEditor editorState={editorState} />
  </RichContentWrapper>
);

Editor.propTypes = {
  editorState: PropTypes.object,
  handleFileUpload: PropTypes.func,
};

export default Editor;
