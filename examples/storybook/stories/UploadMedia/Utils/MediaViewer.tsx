import React, { FunctionComponent } from 'react';
import { RicosContent, RicosViewer } from 'ricos-viewer';
import { pluginVideo } from 'wix-rich-content-plugin-video/viewer';
import { pluginImage } from 'wix-rich-content-plugin-image/viewer';
import { pluginGallery } from 'wix-rich-content-plugin-gallery/viewer';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload/viewer';

function getPlugins() {
  return [pluginImage(), pluginVideo(), pluginGallery(), pluginFileUpload()];
}

const MediaViewer: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosViewer plugins={getPlugins()} content={content} />
);

export default MediaViewer;
