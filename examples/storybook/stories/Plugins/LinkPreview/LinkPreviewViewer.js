import React from 'react';
import { RicosViewer } from 'wix-rich-content-wrapper/dist/es/viewer';
import PropTypes from 'prop-types';
import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview/dist/module.viewer';
import { pluginLink } from 'wix-rich-content-plugin-link/dist/module.viewer';

const plugins = [pluginLinkPreview({ enableEmbed: true }), pluginLink()];

const LinkPreviewViewer = ({ contentState }) => (
  <RicosViewer contentState={contentState} plugins={plugins} />
);

LinkPreviewViewer.propTypes = {
  contentState: PropTypes.object,
};

export default LinkPreviewViewer;
