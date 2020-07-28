import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/module.viewer';
import { galleryTypeMapper } from 'wix-rich-content-plugin-gallery/dist/module.viewer.cjs';
import { videoTypeMapper } from 'wix-rich-content-plugin-video/dist/module.viewer.cjs';
import { soundCloudTypeMapper } from 'wix-rich-content-plugin-sound-cloud/dist/module.viewer.cjs';
import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css';
import 'wix-rich-content-plugin-video/dist/styles.min.css';
import 'wix-rich-content-plugin-gallery/dist/styles.min.css';

const typeMappers = [imageTypeMapper, galleryTypeMapper, videoTypeMapper, soundCloudTypeMapper];

export default () => {
  return <RichContentViewer typeMappers={typeMappers} />;
};
