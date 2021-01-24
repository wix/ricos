import React, { FunctionComponent } from 'react';
import { RicosContent, RicosViewer } from 'ricos-viewer';

import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview/dist/module.viewer';
import { pluginLink } from 'wix-rich-content-plugin-link/dist/module.viewer';

const plugins = [pluginLinkPreview({ enableEmbed: true }), pluginLink()];

const LinkPreviewViewer: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosViewer content={content} plugins={plugins} />
);

export default LinkPreviewViewer;
