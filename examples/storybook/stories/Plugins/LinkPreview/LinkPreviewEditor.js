import React from 'react';
import { RichContentWrapper } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginLinkPreview, LinkPreviewProviders } from 'wix-rich-content-plugin-link-preview';
import { pluginLink } from 'wix-rich-content-plugin-link';
import { pluginHtml } from 'wix-rich-content-plugin-html';
import PropTypes from 'prop-types';
import { mockFetchUrlPreviewData } from '../../../../main/shared/utils/linkPreviewUtil';

const { Instagram, Twitter, YouTube, TikTok } = LinkPreviewProviders;

const plugins = [
  pluginLink({ preview: { enable: true } }),
  pluginLinkPreview({
    fetchData: mockFetchUrlPreviewData(),
    enableEmbed: true,
    enableLinkPreview: true,
    exposeEmbedButtons: [Instagram, Twitter, YouTube, TikTok],
  }),
  pluginHtml(),
];

const LinkPreviewEditor = ({ editorState }) => (
  <RichContentWrapper plugins={plugins} isEditor>
    <RichContentEditor editorState={editorState} />
  </RichContentWrapper>
);

LinkPreviewEditor.propTypes = {
  editorState: PropTypes.object,
};

export default LinkPreviewEditor;
