import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos-editor';
import { pluginMap } from 'wix-rich-content-plugin-map';

const MapEditor: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosEditor plugins={[pluginMap()]} content={content} />
);

export default MapEditor;
