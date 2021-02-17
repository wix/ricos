/* eslint-disable no-console */
import { merge } from 'lodash';
import { pluginLinkButton, pluginActionButton } from 'ricos/button';
import { pluginCodeBlock } from 'ricos/code-block';
import { pluginDivider } from 'ricos/divider';
import { pluginEmoji } from 'ricos/emoji';
import { pluginFileUpload } from 'ricos/file-upload';
import { pluginGallery } from 'ricos/gallery';
import { pluginGiphy } from 'ricos/giphy';
import { pluginHashtag } from 'ricos/hashtag';
import { pluginHeadings } from 'ricos/headings';
import { pluginSpoiler } from 'ricos/spoiler';
import { pluginAccordion } from 'ricos/accordion';
import { pluginTable } from 'ricos/table';
import { pluginHeadersMarkdown } from 'ricos/headers-markdown';
import { pluginHtml } from 'ricos/html';
import { pluginImage } from 'ricos/image';
import { pluginLineSpacing } from 'ricos/line-spacing';
import { pluginIndent } from 'ricos/indent';
import { pluginLink } from 'ricos/link';
import { pluginMap } from 'ricos/map';
import { pluginMentions } from 'ricos/mentions';
import { pluginSoundCloud } from 'ricos/sound-cloud';
import { pluginUndoRedo } from 'ricos/undo-redo';
import { pluginVideo } from 'ricos/video';
import { pluginLinkPreview, LinkPreviewProviders } from 'ricos/link-preview';
import { pluginVerticalEmbed, verticalEmbedProviders } from 'ricos/vertical-embed';
import { mockFetchUrlPreviewData } from '../../../../../examples/main/shared/utils/linkPreviewUtil';
import { pluginTextColor, pluginTextHighlight } from 'ricos/text-color';
import { pluginUnsupportedBlocks } from 'ricos/unsupported-blocks';

import { createPresets } from './utils';
import {
  customForegroundStyleFn,
  styleSelectionPredicate,
  colorScheme,
  customBackgroundStyleFn,
} from '../../../../../examples/main/src/text-color-style-fn';
import { videoHandlers } from '../../../../../examples/main/shared/editor/EditorPlugins';

// eslint-disable-next-line max-len
import { MockVerticalSearchModule } from '../../../../../examples/main/shared/utils/verticalEmbedUtil';

const { Instagram, Twitter, YouTube, TikTok } = LinkPreviewProviders;
const { product } = verticalEmbedProviders;

const onLinkAdd = async (customLinkData, saveData) => {
  const data = await Promise.resolve({ mockURL: 'www.sport5.co.il', mockData: {} });
  saveData(data);
};

const defaultConfigs = {
  fileUpload: {
    accept: '*',
  },
  giphy: {
    giphySdkApiKey: process.env.GIPHY_API_KEY || 'HXSsAGVNzjeUjhKfhhD9noF8sIbpYDsV',
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
  linkPreview: {
    fetchData: mockFetchUrlPreviewData(),
    enableEmbed: true,
    exposeEmbedButtons: [Instagram, Twitter, YouTube, TikTok],
  },
  verticalEmbed: {
    verticalsApi: type => new MockVerticalSearchModule(type),
    // exposeEmbedButtons: [product, event, booking],
    exposeEmbedButtons: [product],
  },
  textHighlight: {
    colorScheme,
    styleSelectionPredicate,
    customStyleFn: customBackgroundStyleFn,
  },
  textColor: {
    colorScheme,
    styleSelectionPredicate,
    customStyleFn: customForegroundStyleFn,
  },
  video: {
    handleFileSelection: videoHandlers.handleFileSelection,
    enableCustomUploadOnMobile: true,
    getVideoUrl: src => `https://video.wixstatic.com/${src.pathname}`,
  },
  gallery: {
    scrollingElement: () => window,
  },
};

const normalizeConfigs = configs => {
  if (configs.link?.isCustomModal) {
    configs.link.onLinkAdd = onLinkAdd;
  }

  return configs;
};

const createPlugins = externalConfigs => {
  const configs = normalizeConfigs(merge(defaultConfigs, externalConfigs));

  return {
    image: pluginImage(),
    gallery: pluginGallery(configs.gallery),
    video: pluginVideo(configs.video),
    html: pluginHtml(),
    divider: pluginDivider(),
    codeBlock: pluginCodeBlock(),
    link: pluginLink(configs.link),
    linkPreview: pluginLinkPreview(configs.linkPreview),
    spacing: pluginLineSpacing(),
    indent: pluginIndent(),
    hashtag: pluginHashtag(),
    mentions: pluginMentions(),
    soundCloud: pluginSoundCloud(),
    giphy: pluginGiphy(configs.giphy),
    headers: pluginHeadersMarkdown(),
    map: pluginMap({ googleMapApiKey: process.env.GOOGLE_MAPS_API_KEY }),
    fileUpload: pluginFileUpload(configs.fileUpload),
    linkButton: pluginLinkButton(),
    actionButton: pluginActionButton(),
    highlight: pluginTextHighlight(configs.textHighlight),
    textColor: pluginTextColor(configs.textColor),
    emoji: pluginEmoji(),
    undoRedo: pluginUndoRedo(),
    headings: pluginHeadings(configs.headings),
    spoiler: pluginSpoiler(),
    accordion: pluginAccordion({
      innerRCEPlugins: [
        pluginTextColor(configs.textColor).createPlugin,
        pluginTextHighlight(configs.textHighlight).createPlugin,
        pluginIndent().createPlugin,
        pluginLineSpacing().createPlugin,
        pluginLink().createPlugin,
        pluginCodeBlock().createPlugin,
        pluginImage().createPlugin,
        pluginUnsupportedBlocks().createPlugin,
      ],
    }),
    table: pluginTable({
      innerRCEPlugins: [
        pluginTextColor(configs.textColor).createPlugin,
        pluginTextHighlight(configs.textHighlight).createPlugin,
        pluginIndent().createPlugin,
        pluginLineSpacing().createPlugin,
        pluginLink().createPlugin,
        pluginCodeBlock().createPlugin,
        pluginUnsupportedBlocks().createPlugin,
      ],
    }),
    verticalEmbed: pluginVerticalEmbed(configs.verticalEmbed),
    unsupportedBlocks: pluginUnsupportedBlocks(),
  };
};

export default (pluginsPreset, externalPluginsConfigs = {}) => {
  const presets = createPresets(createPlugins(externalPluginsConfigs));

  return pluginsPreset
    ? pluginsPreset
        .map(plugin => presets[plugin])
        .flat()
        .filter(val => !!val)
    : presets.all;
};
