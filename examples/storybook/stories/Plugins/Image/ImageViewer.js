import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { pluginImage } from 'wix-rich-content-plugin-image/dist/module.viewer';
import PropTypes from 'prop-types';

const DividerViewer = ({ content, imageConfig }) => (
  <RicosViewer content={content} plugins={[pluginImage(imageConfig)]} />
);

DividerViewer.propTypes = {
  content: PropTypes.object,
  imageConfig: PropTypes.object,
};

export default DividerViewer;
