import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos-editor';
import { pluginDivider } from 'wix-rich-content-plugin-divider';

const DividerEditor: FunctionComponent<{
  content?: RicosContent;
  injectedContent?: RicosContent;
}> = ({ content, injectedContent }) => (
  <RicosEditor plugins={[pluginDivider()]} content={content} injectedContent={injectedContent} />
);

export default DividerEditor;
