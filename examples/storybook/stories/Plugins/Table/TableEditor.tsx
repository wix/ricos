import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos/editor';
import { pluginTable } from 'ricos/table';
import { pluginImage } from 'ricos/image';
import { pluginLineSpacing } from 'ricos/line-spacing';
import { pluginTextColor, pluginTextHighlight } from 'ricos/text-color';

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
