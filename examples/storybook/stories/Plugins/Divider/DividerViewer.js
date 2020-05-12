import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { pluginDivider } from 'wix-rich-content-plugin-divider/dist/module.viewer';
import PropTypes from 'prop-types';

const DividerViewer = ({ content }) => (
  <RicosViewer content={content} plugins={[pluginDivider()]} />
);

DividerViewer.propTypes = {
  content: PropTypes.object,
};

export default DividerViewer;
