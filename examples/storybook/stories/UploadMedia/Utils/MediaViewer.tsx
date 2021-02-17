import React, { FunctionComponent } from 'react';
import { RicosContent, RicosViewer } from 'ricos/viewer';
import { pluginVideo } from 'ricos/video/viewer';
import { pluginImage } from 'ricos/image/viewer';
import { pluginGallery } from 'ricos/gallery/viewer';
import { pluginFileUpload } from 'ricos/file-upload/viewer';

function getPlugins() {
  return [pluginImage(), pluginVideo(), pluginGallery(), pluginFileUpload()];
}

const MediaViewer: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosViewer plugins={getPlugins()} content={content} />
);

export default MediaViewer;
