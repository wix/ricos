import React from 'react';
import { RicosEditor } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginHtml } from 'wix-rich-content-plugin-html';
import { pluginImage } from 'wix-rich-content-plugin-image';
import { pluginLink } from 'wix-rich-content-plugin-link';

const plugins = [pluginImage, pluginLink, pluginHtml];
const helpers = {
  openModal: undefined,
  closeModal: undefined,
};

export default () => {
  <RicosEditor plugins={plugins} theme={'Default'}>
    <RichContentEditor helpers={helpers} />
  </RicosEditor>;
};
