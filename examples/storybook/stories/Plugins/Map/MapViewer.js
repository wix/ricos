import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { pluginMap } from 'wix-rich-content-plugin-map/dist/module.viewer';
import PropTypes from 'prop-types';

const MapViewer = ({ content }) => <RicosViewer content={content} plugins={[pluginMap()]} />;

MapViewer.propTypes = {
  content: PropTypes.object,
};

export default MapViewer;
