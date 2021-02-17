import React from 'react';
import { RicosEditorType } from 'ricos/editor';
import { pluginHtml } from 'ricos/html/editor';
import { pluginImage } from 'ricos/image/editor';
import { pluginLink } from 'ricos/link/editor';

const plugins = [pluginImage(), pluginLink(), pluginHtml()];

export default () => {
  return <RicosEditorType plugins={plugins} />;
};
