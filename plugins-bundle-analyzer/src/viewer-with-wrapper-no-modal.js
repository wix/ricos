import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { pluginHtml } from 'wix-rich-content-plugin-html/dist/module.viewer.js';
import { pluginImage } from 'wix-rich-content-plugin-image/dist/module.viewer.js';
import { pluginLink } from 'wix-rich-content-plugin-link/dist/module.viewer.js';

const plugins = [pluginImage, pluginLink, pluginHtml];
const helpers = {
  onExpand: () => {},
};

export default () => {
  return (
    <RicosViewer plugins={plugins} theme={'Default'}>
      <RichContentViewer helpers={helpers} />
    </RicosViewer>
  );
};
