import React from 'react';
import { RichContentWrapper } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginDivider } from 'wix-rich-content-plugin-divider';
import PropTypes from 'prop-types';

const DividerEditor = ({ editorState }) => (
  <RichContentWrapper plugins={[pluginDivider()]}>
    <RichContentEditor editorState={editorState} />
  </RichContentWrapper>
);

DividerEditor.propTypes = {
  editorState: PropTypes.object,
};

export default DividerEditor;
