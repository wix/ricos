import React, { FunctionComponent } from 'react';
import { RicosContent, RicosViewer } from 'ricos/viewer';
import { pluginGallery } from 'ricos/gallery/dist/module.viewer';
import PropTypes from 'prop-types';

const GalleryViewer: FunctionComponent<{
  content?: RicosContent;
  galleryConfig?: Parameters<typeof pluginGallery>[0];
}> = ({ content, galleryConfig }) => (
  <RicosViewer content={content} plugins={[pluginGallery(galleryConfig)]} />
);

export default GalleryViewer;
