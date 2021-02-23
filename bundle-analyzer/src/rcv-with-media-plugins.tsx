import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/viewer';
import { galleryTypeMapper } from 'wix-rich-content-plugin-gallery/viewer';
import { videoTypeMapper } from 'wix-rich-content-plugin-video/viewer';
import 'wix-rich-content-plugin-video/dist/styles.min.css';
import 'wix-rich-content-plugin-gallery/dist/styles.min.css';

const typeMappers = [imageTypeMapper, galleryTypeMapper, videoTypeMapper];

export default () => {
  return <RichContentViewer typeMappers={typeMappers} />;
};
