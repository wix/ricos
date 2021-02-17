import React, { FunctionComponent } from 'react';
import { RicosContent, RicosViewer } from 'ricos/viewer';
import { pluginImage } from 'ricos/image/viewer';
import { pluginTable } from 'ricos/table/dist/module.viewer';
import { pluginLineSpacing } from 'ricos/line-spacing/dist/module.viewer';
import { pluginTextColor, pluginTextHighlight } from 'ricos/text-color/dist/module.viewer';

const plugins = [
  pluginTable(),
  pluginImage(),
  pluginTextColor(),
  pluginTextHighlight(),
  pluginLineSpacing(),
];

const TableViewer: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosViewer content={content} plugins={plugins} />
);

export default TableViewer;
