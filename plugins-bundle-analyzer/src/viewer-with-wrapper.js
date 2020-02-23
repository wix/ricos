import React from 'react';
import { RichContentWrapper } from 'wix-rich-content-wrapper';
import {
  pluginHtml,
  htmlTypeMapper,
  HTML_TYPE,
} from 'wix-rich-content-plugin-html/dist/module.viewer.js';
import { pluginButton } from 'wix-rich-content-plugin-button/dist/module.viewer.js';
import { pluginImage, imageTypeMapper } from 'wix-rich-content-plugin-image/dist/module.viewer.js';
import { pluginDivider } from 'wix-rich-content-plugin-divider/dist/module.viewer.js';
import { pluginGallery } from 'wix-rich-content-plugin-gallery/dist/module.viewer.js';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { linkTypeMapper } from 'wix-rich-content-plugin-link/dist/module.viewer.js';

const typeMappers = [imageTypeMapper, linkTypeMapper, htmlTypeMapper];

export default () => {
  const config = {
    [HTML_TYPE]: {
      htmlIframeSrc: `/static/html-plugin-embed.html`,
    },
  };

  return (
    <RichContentWrapper
      plugins={[pluginButton(), pluginDivider(), pluginGallery(), pluginHtml(), pluginImage()]}
      theme={'Default'}
    >
      <RichContentViewer typeMappers={typeMappers} config={config} />
    </RichContentWrapper>
  );
};
