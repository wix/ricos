import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { pluginMap } from 'wix-rich-content-plugin-map';
import PropTypes from 'prop-types';

const MapEditor = ({ content }) => <RicosEditor plugins={[pluginMap()]} content={content} />;

MapEditor.propTypes = {
  content: PropTypes.object,
};

export default MapEditor;
