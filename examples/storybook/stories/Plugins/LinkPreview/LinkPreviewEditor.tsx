import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos/editor';
import { pluginLinkPreview, LinkPreviewProviders } from 'ricos/link-preview/editor';
import { pluginLink } from 'ricos/link/editor';
import { pluginHtml } from 'ricos/html/editor';
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

const LinkPreviewEditor: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosEditor plugins={plugins} content={content} />
);

export default LinkPreviewEditor;
