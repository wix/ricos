import React, { FunctionComponent } from 'react';
import { RicosContent, RicosViewer } from 'ricos/viewer';
import { pluginImage } from 'ricos/image/viewer';

const ImageViewer: FunctionComponent<{
  content?: RicosContent;
  imageConfig?: Parameters<typeof pluginImage>[0];
}> = ({ content, imageConfig }) => (
  <RicosViewer content={content} plugins={[pluginImage(imageConfig)]} />
);

export default ImageViewer;
