import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { pluginGallery } from 'wix-rich-content-plugin-gallery/dist/module.viewer';
import PropTypes from 'prop-types';

const GalleryViewer = ({ content }) => (
  <RicosViewer content={content} plugins={[pluginGallery()]} />
);

GalleryViewer.propTypes = {
  content: PropTypes.object,
};

export default GalleryViewer;
