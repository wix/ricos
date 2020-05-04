import React from 'react';
import { WixRichContentEditor } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginDivider } from 'wix-rich-content-plugin-divider';
import PropTypes from 'prop-types';

const DividerEditor = ({ editorState }) => (
  <WixRichContentEditor plugins={[pluginDivider()]}>
    <RichContentEditor editorState={editorState} />
  </WixRichContentEditor>
);

DividerEditor.propTypes = {
  editorState: PropTypes.object,
};

export default DividerEditor;
