import React, { FunctionComponent } from 'react';
import { DraftContent, RicosEditor } from 'ricos-editor';
import { pluginSpoiler } from 'wix-rich-content-plugin-spoiler';

const SpoilerEditor: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosEditor plugins={[pluginSpoiler()]} content={content} />
);

export default SpoilerEditor;
