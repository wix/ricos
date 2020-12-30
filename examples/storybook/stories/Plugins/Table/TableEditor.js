import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { pluginTable } from 'wix-rich-content-plugin-table';
import { pluginImage } from 'wix-rich-content-plugin-image';
import { pluginLineSpacing } from 'wix-rich-content-plugin-line-spacing';
import { pluginTextColor, pluginTextHighlight } from 'wix-rich-content-plugin-text-color';
import PropTypes from 'prop-types';

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

const TableEditor = ({ content }) => <RicosEditor plugins={plugins} content={content} />;

TableEditor.propTypes = {
  content: PropTypes.object,
};

export default TableEditor;
