/* eslint-disable no-console */
import { merge } from 'lodash';
import { pluginLinkButton, pluginActionButton } from 'ricos/button/editor';
import { pluginCodeBlock } from 'ricos/code-block/editor';
import { pluginDivider } from 'ricos/divider/editor';
import { pluginEmoji } from 'ricos/emoji/editor';
import { pluginFileUpload } from 'ricos/file/editor';
import { pluginGallery } from 'ricos/gallery/editor';
import { pluginGiphy } from 'ricos/giphy/editor';
import { pluginHashtag } from 'ricos/hashtag/editor';
import { pluginHeadings } from 'ricos/heading';
import { pluginSpoiler } from 'ricos/spoiler/editor';
import { pluginAccordion } from 'ricos/accordion/editor';
import { pluginTable } from 'ricos/table/editor';
import { pluginHeadersMarkdown } from 'ricos/headers-markdown/editor';
import { pluginHtml } from 'ricos/html/editor';
import { pluginImage } from 'ricos/image/editor';
import { pluginLineSpacing } from 'ricos/line-spacing/editor';
import { pluginIndent } from 'ricos/indent/editor';
import { pluginLink } from 'ricos/link/editor';
import { pluginMap } from 'ricos/map/editor';
import { pluginMentions } from 'ricos/mention/editor';
import { pluginSoundCloud } from 'ricos/sound-cloud/editor';
import { pluginUndoRedo } from 'ricos/undo-redo/editor';
import { pluginVideo } from 'ricos/video/editor';
import { pluginLinkPreview, LinkPreviewProviders } from 'ricos/link-preview/editor';
import { pluginVerticalEmbed, verticalEmbedProviders } from 'ricos/vertical-embed/editor';
import { mockFetchUrlPreviewData } from '../../../../../examples/main/shared/utils/linkPreviewUtil';
import { pluginTextColor, pluginTextHighlight } from 'ricos/text-color/editor';
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
