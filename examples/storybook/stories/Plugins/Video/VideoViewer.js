import React from 'react';
import { RicosViewer } from 'wix-rich-content-wrapper/dist/es/viewer';
import { pluginVideo } from 'wix-rich-content-plugin-video/dist/module.viewer';
import PropTypes from 'prop-types';

const Viewer = ({ contentState }) => (
  <RicosViewer contentState={contentState} plugins={[pluginVideo()]} />
);

Viewer.propTypes = {
  contentState: PropTypes.object,
};

export default Viewer;
