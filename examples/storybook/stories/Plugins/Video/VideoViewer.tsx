import React, { FunctionComponent } from 'react';
import { RicosContent, RicosViewer } from 'ricos/viewer';
import { pluginVideo } from 'ricos/video/viewer';

const Viewer: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosViewer content={content} plugins={[pluginVideo()]} />
);

export default Viewer;
