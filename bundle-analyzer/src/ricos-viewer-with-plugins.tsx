import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import 'ricos-viewer/dist/styles.min.css';
import 'wix-rich-content-plugin-commons/dist/styles.min.css';
import { pluginHtml } from 'wix-rich-content-plugin-html/viewer';
import 'wix-rich-content-plugin-html/dist/styles.min.css';
import { pluginImage } from 'wix-rich-content-plugin-image/viewer';
import 'wix-rich-content-plugin-image/dist/styles.min.css';
import { pluginLink } from 'wix-rich-content-plugin-link/viewer';
import 'wix-rich-content-plugin-link/dist/styles.min.css';

const plugins = [pluginImage(), pluginLink(), pluginHtml()];

export default () => {
  return <RicosViewer plugins={plugins} />;
};
