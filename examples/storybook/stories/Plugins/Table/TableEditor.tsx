import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos/editor';
import { pluginTable } from 'ricos/table/editor';
import { pluginImage } from 'ricos/image/editor';
import { pluginLineSpacing } from 'ricos/line-spacing/editor';
import { pluginTextColor, pluginTextHighlight } from 'ricos/text-color/editor';

const plugins = [
  pluginTable({
    innerRCEPlugins: [
      pluginTextColor().createPlugin,
      pluginTextHighlight().createPlugin,
      pluginLineSpacing().createPlugin,
      pluginImage().createPlugin,
    ],
  }),
];

const TableEditor: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosEditor plugins={plugins} content={content} />
);

export default TableEditor;
