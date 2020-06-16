import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { pluginDivider } from 'wix-rich-content-plugin-divider';
import PropTypes from 'prop-types';

const DividerEditor = ({ content }) => (
  <RicosEditor plugins={[pluginDivider()]} content={content} />
);

DividerEditor.propTypes = {
  content: PropTypes.object,
};

export default DividerEditor;
