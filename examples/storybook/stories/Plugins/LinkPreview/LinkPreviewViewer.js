import React from 'react';
import { RicosViewer } from 'wix-rich-content-wrapper/dist/es/viewer';
import PropTypes from 'prop-types';
import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview/dist/module.viewer';
import { pluginLink } from 'wix-rich-content-plugin-link/dist/module.viewer';

const plugins = [pluginLinkPreview({ enableEmbed: true }), pluginLink()];

const DividerViewer = ({ contentState }) => (
  <RicosViewer contentState={contentState} plugins={plugins} />
);

DividerViewer.propTypes = {
  contentState: PropTypes.object,
};

export default DividerViewer;
