import React, { FunctionComponent } from 'react';
import { DraftContent, RicosViewer } from 'ricos-viewer';
import { pluginImage } from 'wix-rich-content-plugin-image/viewer';

const ImageViewer: FunctionComponent<{
  content?: DraftContent;
  imageConfig?: Parameters<typeof pluginImage>[0];
}> = ({ content, imageConfig }) => (
  <RicosViewer content={content} plugins={[pluginImage(imageConfig)]} />
);

export default ImageViewer;
