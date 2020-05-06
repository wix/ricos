import React from 'react';
import { RicosEditor } from 'wix-rich-content-wrapper';
import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview';
import { pluginLink } from 'wix-rich-content-plugin-link';
import { pluginHtml } from 'wix-rich-content-plugin-html';
import PropTypes from 'prop-types';
import { mockFetchUrlPreviewData } from '../../../../main/shared/utils/linkPreviewUtil';

const plugins = [
  pluginLink(),
  pluginLinkPreview({ fetchData: mockFetchUrlPreviewData(), enableEmbed: true }),
  pluginHtml(),
];

const DividerEditor = ({ contentState }) => (
  <RicosEditor plugins={plugins} contentState={contentState} />
);

DividerEditor.propTypes = {
  contentState: PropTypes.object,
};

export default DividerEditor;
