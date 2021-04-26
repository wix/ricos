import React from 'react';
import { RicosEditorType } from 'ricos-editor';
import 'ricos-editor/dist/styles.min.css';
import 'wix-rich-content-plugin-commons/dist/styles.min.css';
import { pluginHtml } from 'wix-rich-content-plugin-html';
import 'wix-rich-content-plugin-html/dist/styles.min.css';
import { pluginImage } from 'wix-rich-content-plugin-image';
import 'wix-rich-content-plugin-image/dist/styles.min.css';
import { pluginLink } from 'wix-rich-content-plugin-link';
import 'wix-rich-content-plugin-link/dist/styles.min.css';

const plugins = [pluginImage(), pluginLink(), pluginHtml()];

export default () => {
  return <RicosEditorType plugins={plugins} />;
};
