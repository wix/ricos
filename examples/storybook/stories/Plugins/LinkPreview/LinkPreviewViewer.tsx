import React, { FunctionComponent } from 'react';
import { RicosContent, RicosViewer } from 'ricos/viewer';

import { pluginLinkPreview } from 'ricos/link-preview/viewer';
import { pluginLink } from 'ricos/link/viewer';

const plugins = [pluginLinkPreview({ enableEmbed: true }), pluginLink()];

const LinkPreviewViewer: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosViewer content={content} plugins={plugins} />
);

export default LinkPreviewViewer;
