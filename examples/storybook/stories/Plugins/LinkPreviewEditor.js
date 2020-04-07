import React from 'react';
import { RichContentWrapper } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview';
import { pluginLink } from 'wix-rich-content-plugin-link';
import { pluginHtml } from 'wix-rich-content-plugin-html';
import PropTypes from 'prop-types';
import { mockFetchUrlPreviewData } from '../../../main/shared/utils/linkPreviewUtil';

const plugins = [
  pluginLink(),
  pluginLinkPreview({ fetchData: mockFetchUrlPreviewData(), enableEmbed: true }),
  pluginHtml(),
];

const DividerEditor = ({ editorState }) => (
  <RichContentWrapper plugins={plugins} editor>
    <RichContentEditor editorState={editorState} />
  </RichContentWrapper>
);

DividerEditor.propTypes = {
  editorState: PropTypes.object,
};

export default DividerEditor;
