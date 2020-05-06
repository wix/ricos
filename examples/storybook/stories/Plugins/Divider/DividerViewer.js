import React from 'react';
import { RicosViewer } from 'wix-rich-content-wrapper/dist/es/viewer';
import { pluginDivider } from 'wix-rich-content-plugin-divider/dist/module.viewer';
import PropTypes from 'prop-types';

const DividerViewer = ({ contentState }) => (
  <RicosViewer contentState={contentState} plugins={[pluginDivider()]} />
);

DividerViewer.propTypes = {
  contentState: PropTypes.object,
};

export default DividerViewer;
