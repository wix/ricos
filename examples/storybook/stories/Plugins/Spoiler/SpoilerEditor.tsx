import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos/editor';
import { pluginSpoiler } from 'ricos/spoiler';

const SpoilerEditor: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosEditor plugins={[pluginSpoiler()]} content={content} />
);

export default SpoilerEditor;
