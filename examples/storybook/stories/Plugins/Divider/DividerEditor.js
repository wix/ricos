import React from 'react';
import { RicosEditor } from 'wix-rich-content-wrapper';
import { pluginDivider } from 'wix-rich-content-plugin-divider';
import PropTypes from 'prop-types';

const DividerEditor = ({ contentState }) => (
  <RicosEditor plugins={[pluginDivider()]} contentState={contentState} />
);

DividerEditor.propTypes = {
  contentState: PropTypes.object,
};

export default DividerEditor;
