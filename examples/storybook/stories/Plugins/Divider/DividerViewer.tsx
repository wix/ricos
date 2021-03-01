import React, { FunctionComponent } from 'react';
import { RicosContent, RicosViewer } from 'ricos/viewer';
import { pluginDivider } from 'ricos/divider/viewer';

const DividerViewer: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosViewer content={content} plugins={[pluginDivider()]} />
);

export default DividerViewer;
