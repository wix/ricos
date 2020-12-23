import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { pluginDivider } from 'wix-rich-content-plugin-divider';
import PropTypes from 'prop-types';

const DividerEditor = ({ content, injectedContent }) => (
  <RicosEditor plugins={[pluginDivider()]} content={content} injectedContent={injectedContent} />
);

DividerEditor.propTypes = {
  content: PropTypes.object,
};

export default DividerEditor;
