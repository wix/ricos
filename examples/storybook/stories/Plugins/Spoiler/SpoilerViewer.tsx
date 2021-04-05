import React, { FunctionComponent } from 'react';
import { DraftContent, RicosViewer } from 'ricos-viewer';
import { pluginSpoiler } from 'wix-rich-content-plugin-spoiler/dist/module.viewer';

const SpoilerViewer: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosViewer content={content} plugins={[pluginSpoiler()]} />
);

export default SpoilerViewer;
