import React, { FunctionComponent } from 'react';
import { RicosContent, RicosViewer } from 'ricos/viewer';
import { pluginImage } from 'ricos/image/viewer';
import { pluginTable } from 'ricos/table/viewer';
import { pluginLineSpacing } from 'ricos/line-spacing/viewer';
import { pluginTextColor, pluginTextHighlight } from 'ricos/text-color/viewer';

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
