import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import 'wix-rich-content-viewer/dist/styles.min.css';
import 'wix-rich-content-plugin-commons/dist/styles.min.css';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/viewer';
import 'wix-rich-content-plugin-image/dist/styles.min.css';
import { galleryTypeMapper } from 'wix-rich-content-plugin-gallery/viewer';
import 'wix-rich-content-plugin-gallery/dist/styles.min.css';
import { videoTypeMapper } from 'wix-rich-content-plugin-video/viewer';
import 'wix-rich-content-plugin-video/dist/styles.min.css';
import { soundCloudTypeMapper } from 'wix-rich-content-plugin-sound-cloud/viewer';
import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css';

const typeMappers = [imageTypeMapper, galleryTypeMapper, videoTypeMapper, soundCloudTypeMapper];

export default () => {
  return <RichContentViewer typeMappers={typeMappers} />;
};
