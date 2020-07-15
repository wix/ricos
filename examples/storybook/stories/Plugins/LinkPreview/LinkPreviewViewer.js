import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import PropTypes from 'prop-types';
import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview/dist/module.viewer';
import { pluginLink } from 'wix-rich-content-plugin-link/dist/module.viewer';

const plugins = [pluginLinkPreview({ enableEmbed: true }), pluginLink()];

const LinkPreviewViewer = ({ content }) => <RicosViewer content={content} plugins={plugins} />;

LinkPreviewViewer.propTypes = {
  content: PropTypes.object,
};

export default LinkPreviewViewer;
