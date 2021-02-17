import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos/editor';
import { pluginDivider } from 'ricos/divider/editor';

const DividerEditor: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosEditor plugins={[pluginDivider()]} content={content} />
);

export default DividerEditor;
