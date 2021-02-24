import React, { FunctionComponent } from 'react';
import { RicosContent, RicosViewer } from 'ricos-viewer';
import { pluginGallery } from 'wix-rich-content-plugin-gallery/dist/module.viewer';

const GalleryViewer: FunctionComponent<{
  content?: RicosContent;
  galleryConfig?: Parameters<typeof pluginGallery>[0];
}> = ({ content, galleryConfig }) => (
  <RicosViewer content={content} plugins={[pluginGallery(galleryConfig)]} />
);

export default GalleryViewer;
