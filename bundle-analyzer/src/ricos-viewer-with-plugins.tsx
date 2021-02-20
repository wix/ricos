import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { pluginHtml } from 'wix-rich-content-plugin-html/viewer';
import { pluginImage } from 'wix-rich-content-plugin-image/viewer';
import { pluginLink } from 'wix-rich-content-plugin-link/viewer';

const plugins = [pluginImage(), pluginLink(), pluginHtml()];

export default () => {
  return <RicosViewer plugins={plugins} />;
};
