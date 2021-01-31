import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos-editor';
import { pluginDivider } from 'wix-rich-content-plugin-divider';

const DividerEditor: FunctionComponent<{
  content?: RicosContent;
  injectedContent?: RicosContent;
  maxTextLength?: number;
}> = ({ content, injectedContent, maxTextLength }) => (
  <RicosEditor
    plugins={[pluginDivider()]}
    content={content}
    injectedContent={injectedContent}
    maxTextLength={maxTextLength}
  />
);

export default DividerEditor;
