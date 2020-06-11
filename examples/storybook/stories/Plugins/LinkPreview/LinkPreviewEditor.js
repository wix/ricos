import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { pluginLinkPreview, LinkPreviewProviders } from 'wix-rich-content-plugin-link-preview';
import { pluginLink } from 'wix-rich-content-plugin-link';
import { pluginHtml } from 'wix-rich-content-plugin-html';
import PropTypes from 'prop-types';
import { mockFetchUrlPreviewData } from '../../../../main/shared/utils/linkPreviewUtil';

const { Instagram, Twitter, YouTube, TikTok } = LinkPreviewProviders;

const plugins = [
  pluginLink(),
  pluginLinkPreview({
    fetchData: mockFetchUrlPreviewData(),
    exposeEmbedButtons: [Instagram, Twitter, YouTube, TikTok],
    enableEmbed: true,
  }),
  pluginHtml(),
];

const LinkPreviewEditor = ({ content }) => <RicosEditor plugins={plugins} content={content} />;

LinkPreviewEditor.propTypes = {
  content: PropTypes.object,
};

export default LinkPreviewEditor;
