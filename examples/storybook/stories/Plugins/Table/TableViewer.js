import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import PropTypes from 'prop-types';
import { pluginImage } from 'wix-rich-content-plugin-image/viewer';
import { pluginTable } from 'wix-rich-content-plugin-table/dist/module.viewer';
import { pluginLineSpacing } from 'wix-rich-content-plugin-line-spacing/dist/module.viewer';
import {
  pluginTextColor,
  pluginTextHighlight,
} from 'wix-rich-content-plugin-text-color/dist/module.viewer';

const plugins = [
  pluginTable(),
  pluginImage(),
  pluginTextColor(),
  pluginTextHighlight(),
  pluginLineSpacing(),
];

const TableViewer = ({ content }) => <RicosViewer content={content} plugins={plugins} />;

TableViewer.propTypes = {
  content: PropTypes.object,
};

export default TableViewer;
