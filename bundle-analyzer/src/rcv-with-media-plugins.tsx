import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { imageTypeMapper } from 'ricos/image/viewer';
import { galleryTypeMapper } from 'ricos/gallery/viewer';
import { videoTypeMapper } from 'ricos/video/viewer';
import { soundCloudTypeMapper } from 'ricos/sound-cloud/viewer';

const typeMappers = [imageTypeMapper, galleryTypeMapper, videoTypeMapper, soundCloudTypeMapper];

export default () => {
  return <RichContentViewer typeMappers={typeMappers} />;
};
