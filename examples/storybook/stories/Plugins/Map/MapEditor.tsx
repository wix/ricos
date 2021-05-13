import React, { FunctionComponent } from 'react';
import { DraftContent, RicosEditor } from 'ricos-editor';
import { pluginMap } from 'wix-rich-content-plugin-map';

const MapEditor: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosEditor plugins={[pluginMap()]} content={content} />
);

export default MapEditor;
