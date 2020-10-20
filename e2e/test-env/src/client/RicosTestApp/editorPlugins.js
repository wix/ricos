/* eslint-disable no-console */
import { pluginLinkButton, pluginActionButton } from 'wix-rich-content-plugin-button';
import { pluginCodeBlock } from 'wix-rich-content-plugin-code-block';
import { pluginDivider } from 'wix-rich-content-plugin-divider';
import { pluginEmoji } from 'wix-rich-content-plugin-emoji';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload';
import { pluginGallery } from 'wix-rich-content-plugin-gallery';
import { pluginGiphy } from 'wix-rich-content-plugin-giphy';
import { pluginHashtag } from 'wix-rich-content-plugin-hashtag';
import { pluginHeadings } from 'wix-rich-content-plugin-headings';
import { pluginSpoiler } from 'wix-rich-content-plugin-spoiler';
import { pluginAccordion } from 'wix-rich-content-plugin-accordion';
import { pluginTable } from 'wix-rich-content-plugin-table';
import { pluginHeadersMarkdown } from 'wix-rich-content-plugin-headers-markdown';
import { pluginHtml } from 'wix-rich-content-plugin-html';
import { pluginImage } from 'wix-rich-content-plugin-image';
import { pluginLineSpacing } from 'wix-rich-content-plugin-line-spacing';
import { pluginIndent } from 'wix-rich-content-plugin-indent';
import { pluginLink } from 'wix-rich-content-plugin-link';
import { pluginMap } from 'wix-rich-content-plugin-map';
import { pluginMentions } from 'wix-rich-content-plugin-mentions';
import { pluginSoundCloud } from 'wix-rich-content-plugin-sound-cloud';
import { pluginUndoRedo } from 'wix-rich-content-plugin-undo-redo';
import { pluginVideo } from 'wix-rich-content-plugin-video';
import { pluginLinkPreview, LinkPreviewProviders } from 'wix-rich-content-plugin-link-preview';
import {
  pluginVerticalEmbed,
  verticalEmbedProviders,
} from 'wix-rich-content-plugin-vertical-embed';
import { mockFetchUrlPreviewData } from '../../../../../examples/main/shared/utils/linkPreviewUtil';
import { pluginTextColor, pluginTextHighlight } from 'wix-rich-content-plugin-text-color';

import { createPresets } from './utils';
import {
  customForegroundStyleFn,
  styleSelectionPredicate,
  colorScheme,
  customBackgroundStyleFn,
} from '../../../../../examples/main/src/text-color-style-fn';
import { videoHandlers } from '../../../../../examples/main/shared/editor/EditorPlugins';

// eslint-disable-next-line max-len
import MockVerticalSearchModule from '../../../../../examples/main/shared/utils/verticalEmbedUtil';
import { mockFileUploadFunc } from '../../../../../examples/main/shared/utils/fileUploadUtil';

const { Instagram, Twitter, YouTube, TikTok } = LinkPreviewProviders;
const { product } = verticalEmbedProviders;

const configs = {
  fileUpload: {
    accept: '*',
    handleFileSelection: mockFileUploadFunc,
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
    handleFileSelection: () => true,
    scrollingElement: () => window,
  },
};

const plugins = {
  image: pluginImage({ handleFileSelection: () => true }),
  gallery: pluginGallery(configs.gallery),
  video: pluginVideo(configs.video),
  html: pluginHtml(),
  divider: pluginDivider(),
  codeBlock: pluginCodeBlock(),
  link: pluginLink(),
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
  headings: pluginHeadings(),
  spoiler: pluginSpoiler(),
  accordion: pluginAccordion({
    innerRCEPlugins: [
      pluginTextColor(configs.textColor).createPlugin,
      pluginTextHighlight(configs.textHighlight).createPlugin,
      pluginIndent().createPlugin,
      pluginLineSpacing().createPlugin,
      pluginLink().createPlugin,
      pluginCodeBlock().createPlugin,
    ],
  }),
  table: pluginTable(),
  verticalEmbed: pluginVerticalEmbed(configs.verticalEmbed),
};

const presets = createPresets(plugins);

export default pluginsPreset =>
  pluginsPreset
    ? pluginsPreset
        .map(plugin => presets[plugin])
        .flat()
        .filter(val => !!val)
    : presets.all;
