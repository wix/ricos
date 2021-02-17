import React from 'react';
import { RicosViewer } from 'ricos/viewer';
import { pluginHtml } from 'ricos/html/viewer';
import { pluginImage } from 'ricos/image/viewer';
import { pluginLink } from 'ricos/link/viewer';

const plugins = [pluginImage(), pluginLink(), pluginHtml()];

export default () => {
  return <RicosViewer plugins={plugins} />;
};
