import React, { FunctionComponent } from 'react';
import { RicosContent, RicosViewer } from 'ricos/viewer';
import { pluginSpoiler } from 'ricos/spoiler/viewer';

const SpoilerViewer: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosViewer content={content} plugins={[pluginSpoiler()]} />
);

export default SpoilerViewer;
