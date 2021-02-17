import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos/editor';
import { pluginMap } from 'ricos/map/editor';

const MapEditor: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosEditor plugins={[pluginMap()]} content={content} />
);

export default MapEditor;
