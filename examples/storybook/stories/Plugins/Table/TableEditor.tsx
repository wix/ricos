import React, { FunctionComponent } from 'react';
import { DraftContent, RicosEditor } from 'ricos-editor';
import { pluginTable } from 'wix-rich-content-plugin-table';
import { pluginImage } from 'wix-rich-content-plugin-image';
import { pluginLineSpacing } from 'wix-rich-content-plugin-line-spacing';
import { pluginTextColor, pluginTextHighlight } from 'wix-rich-content-plugin-text-color';

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

const TableEditor: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosEditor plugins={plugins} content={content} />
);

export default TableEditor;
