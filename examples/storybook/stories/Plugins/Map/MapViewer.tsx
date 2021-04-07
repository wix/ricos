import React, { FunctionComponent } from 'react';
import { DraftContent, RicosViewer } from 'ricos-viewer';
import { pluginMap } from 'wix-rich-content-plugin-map/dist/module.viewer';

const MapViewer: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosViewer content={content} plugins={[pluginMap()]} />
);

export default MapViewer;
