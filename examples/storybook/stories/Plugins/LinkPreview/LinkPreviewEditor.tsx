import React, { FunctionComponent } from 'react';
import { DraftContent, RicosEditor } from 'ricos-editor';
import { pluginLinkPreview, LinkPreviewProviders } from 'wix-rich-content-plugin-link-preview';
import { pluginLink } from 'wix-rich-content-plugin-link';
import { pluginHtml } from 'wix-rich-content-plugin-html';
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

const LinkPreviewEditor: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosEditor plugins={plugins} content={content} />
);

export default LinkPreviewEditor;
