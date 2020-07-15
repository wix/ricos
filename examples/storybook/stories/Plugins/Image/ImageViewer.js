import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { pluginImage } from 'wix-rich-content-plugin-image/dist/module.viewer';
import PropTypes from 'prop-types';

const DividerViewer = ({ content }) => <RicosViewer content={content} plugins={[pluginImage()]} />;

DividerViewer.propTypes = {
  content: PropTypes.object,
};

export default DividerViewer;
