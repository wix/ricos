import React from 'react';
import { RichContentEditor } from 'ricos/editor';
import { createImagePlugin } from 'ricos/image/editor';
import { createLinkPlugin } from 'ricos/link/editor';
import { createHtmlPlugin } from 'ricos/html/editor';

const plugins = [createImagePlugin, createLinkPlugin, createHtmlPlugin];

export default () => {
  return <RichContentEditor plugins={plugins} />;
};
