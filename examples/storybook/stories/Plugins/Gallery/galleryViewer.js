import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { pluginGallery } from 'wix-rich-content-plugin-gallery/dist/module.viewer';
import PropTypes from 'prop-types';

const GalleryViewer = ({ content, galleryConfig }) => (
  <RicosViewer content={content} plugins={[pluginGallery(galleryConfig)]} />
);

GalleryViewer.propTypes = {
  content: PropTypes.object,
  galleryConfig: PropTypes.object,
};

export default GalleryViewer;
