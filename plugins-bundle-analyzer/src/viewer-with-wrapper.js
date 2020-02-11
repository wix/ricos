import React from 'react';
import { ViewerWrapper } from 'wix-rich-content-wrapper/dist/module.js';
import {
  rcvHtml,
  htmlTypeMapper,
  HTML_TYPE,
} from 'wix-rich-content-plugin-html/dist/module.viewer.js';
import { rcvButton } from 'wix-rich-content-plugin-button/dist/module.viewer.js';
import { rcvImage, imageTypeMapper } from 'wix-rich-content-plugin-image/dist/module.viewer.js';
import { rcvDivider } from 'wix-rich-content-plugin-divider/dist/module.viewer.js';
import { rcvGallery } from 'wix-rich-content-plugin-gallery/dist/module.viewer.js';
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
    <ViewerWrapper
      plugins={[rcvButton(), rcvDivider(), rcvGallery(), rcvHtml(), rcvImage()]}
      theme={'Default'}
    >
      <RichContentViewer typeMappers={typeMappers} config={config} />
    </ViewerWrapper>
  );
};
