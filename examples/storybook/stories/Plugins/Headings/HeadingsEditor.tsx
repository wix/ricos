import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos/editor';
import { pluginHeadings } from 'ricos/heading';

const HeadingsEditor: FunctionComponent<{
  content?: RicosContent;
  withHeadingsMenu?: boolean;
}> = ({ content, withHeadingsMenu }) => (
  <RicosEditor plugins={withHeadingsMenu ? [pluginHeadings()] : []} content={content} />
);

export default HeadingsEditor;
