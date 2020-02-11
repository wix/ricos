import React from 'react';
import { htmlTypeMapper, HTML_TYPE } from 'wix-rich-content-plugin-html/dist/module.viewer';
import { ViewerWrapper } from 'wix-rich-content-wrapper';
import { rcvButton } from 'wix-rich-content-plugin-button';
import { rcvImage } from 'wix-rich-content-plugin-image';
import { rcvHtml } from 'wix-rich-content-plugin-html';
import { rcvDivider } from 'wix-rich-content-plugin-divider';
import { rcvGallery } from 'wix-rich-content-plugin-gallery';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/module.viewer';
import { linkTypeMapper } from 'wix-rich-content-plugin-link/dist/module.viewer';

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
