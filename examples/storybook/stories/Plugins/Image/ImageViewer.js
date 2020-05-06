import React from 'react';
import { RicosViewer } from 'wix-rich-content-wrapper/dist/es/viewer';
import { pluginImage } from 'wix-rich-content-plugin-image/dist/module.viewer';
import PropTypes from 'prop-types';

const DividerViewer = ({ contentState }) => (
  <RicosViewer contentState={contentState} plugins={[pluginImage()]} />
);

DividerViewer.propTypes = {
  contentState: PropTypes.object,
};

export default DividerViewer;
