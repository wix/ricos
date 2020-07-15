import React from 'react';
import { RichContentEditor } from 'wix-rich-content-editor';
import { createImagePlugin } from 'wix-rich-content-plugin-image';
import { createLinkPlugin } from 'wix-rich-content-plugin-link';
import { createHtmlPlugin } from 'wix-rich-content-plugin-html';

const plugins = [createImagePlugin, createLinkPlugin, createHtmlPlugin];

export default () => {
  return <RichContentEditor plugins={plugins} />;
};
