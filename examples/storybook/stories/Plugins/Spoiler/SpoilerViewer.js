import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { pluginSpoiler } from 'wix-rich-content-plugin-spoiler/dist/module.viewer';
import PropTypes from 'prop-types';

const SpoilerViewer = ({ content }) => (
  <RicosViewer content={content} plugins={[pluginSpoiler()]} />
);

SpoilerViewer.propTypes = {
  content: PropTypes.object,
};

export default SpoilerViewer;
