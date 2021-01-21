import React, { FunctionComponent } from 'react';
import { RicosContent, RicosViewer } from 'ricos-viewer';
import { pluginMap } from 'wix-rich-content-plugin-map/dist/module.viewer';

const MapViewer: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosViewer content={content} plugins={[pluginMap()]} />
);

export default MapViewer;
