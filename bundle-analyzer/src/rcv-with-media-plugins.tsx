import React from 'react';
import { RichContentViewer } from 'ricos/viewer';
import { imageTypeMapper } from 'ricos/image/viewer';
import { galleryTypeMapper } from 'ricos/gallery/viewer';
import { videoTypeMapper } from 'ricos/video/viewer';
import { soundCloudTypeMapper } from 'ricos/sound-cloud/viewer';
import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css';
import 'wix-rich-content-plugin-video/dist/styles.min.css';
import 'wix-rich-content-plugin-gallery/dist/styles.min.css';

const typeMappers = [imageTypeMapper, galleryTypeMapper, videoTypeMapper, soundCloudTypeMapper];

export default () => {
  return <RichContentViewer typeMappers={typeMappers} />;
};
