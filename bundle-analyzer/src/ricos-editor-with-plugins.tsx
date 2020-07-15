import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { pluginHtml } from 'wix-rich-content-plugin-html';
import { pluginImage } from 'wix-rich-content-plugin-image';
import { pluginLink } from 'wix-rich-content-plugin-link';

const plugins = [pluginImage(), pluginLink(), pluginHtml()];

export default () => {
  return <RicosEditor plugins={plugins} />;
};
