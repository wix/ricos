import React from 'react';
import { RichContentEditor } from 'wix-rich-content-editor';
import 'wix-rich-content-editor/dist/styles.min.css';
import 'wix-rich-content-plugin-commons/dist/styles.min.css';
import { createHtmlPlugin } from 'wix-rich-content-plugin-html';
import 'wix-rich-content-plugin-html/dist/styles.min.css';
import { createImagePlugin } from 'wix-rich-content-plugin-image';
import 'wix-rich-content-plugin-image/dist/styles.min.css';
import { createLinkPlugin } from 'wix-rich-content-plugin-link';
import 'wix-rich-content-plugin-link/dist/styles.min.css';

const plugins = [createImagePlugin, createLinkPlugin, createHtmlPlugin];

export default () => {
  return <RichContentEditor plugins={plugins} />;
};
