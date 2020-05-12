import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { pluginVideo } from 'wix-rich-content-plugin-video/dist/module.viewer';
import PropTypes from 'prop-types';

const Viewer = ({ content }) => <RicosViewer content={content} plugins={[pluginVideo()]} />;

Viewer.propTypes = {
  content: PropTypes.object,
};

export default Viewer;
