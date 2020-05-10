import React from 'react';
import { RicosViewer } from 'wix-rich-content-wrapper/dist/es/viewer';
import { pluginHtml } from 'wix-rich-content-plugin-html/dist/module.viewer.js';
import { pluginImage } from 'wix-rich-content-plugin-image/dist/module.viewer.js';
import { pluginLink } from 'wix-rich-content-plugin-link/dist/module.viewer.js';

const plugins = [pluginImage, pluginLink, pluginHtml];

export default () => {
  return <RicosViewer plugins={plugins} theme={'Default'} />;
};
