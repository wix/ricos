import React from 'react';
import { RicosEditor } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginDivider } from 'wix-rich-content-plugin-divider';
import PropTypes from 'prop-types';

const DividerEditor = ({ editorState }) => (
  <RicosEditor plugins={[pluginDivider()]}>
    <RichContentEditor editorState={editorState} />
  </RicosEditor>
);

DividerEditor.propTypes = {
  editorState: PropTypes.object,
};

export default DividerEditor;
