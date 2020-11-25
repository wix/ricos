/* eslint-disable no-console */
import { pluginLinkButton, pluginActionButton } from 'wix-rich-content-plugin-button/viewer';
import { pluginCodeBlock } from 'wix-rich-content-plugin-code-block/viewer';
import { pluginDivider } from 'wix-rich-content-plugin-divider/viewer';
import { pluginEmoji } from 'wix-rich-content-plugin-emoji/viewer';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload/viewer';
import { pluginGallery } from 'wix-rich-content-plugin-gallery/viewer';
import { pluginGiphy } from 'wix-rich-content-plugin-giphy/viewer';
import { pluginHashtag } from 'wix-rich-content-plugin-hashtag/viewer';
import { pluginIndent } from 'wix-rich-content-plugin-indent';
import { pluginHeadersMarkdown } from 'wix-rich-content-plugin-headers-markdown/viewer';
import { pluginHtml } from 'wix-rich-content-plugin-html/viewer';
import { pluginImage } from 'wix-rich-content-plugin-image/viewer';
import { pluginSpoiler } from 'wix-rich-content-plugin-spoiler/viewer';
import { pluginLineSpacing } from 'wix-rich-content-plugin-line-spacing/viewer';
import { pluginLink } from 'wix-rich-content-plugin-link/viewer';
import { pluginMap } from 'wix-rich-content-plugin-map/viewer';
import { pluginMentions } from 'wix-rich-content-plugin-mentions/viewer';
import { pluginSoundCloud } from 'wix-rich-content-plugin-sound-cloud/viewer';
import { pluginVideo } from 'wix-rich-content-plugin-video/viewer';
import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview/viewer';
import { pluginVerticalEmbed } from 'wix-rich-content-plugin-vertical-embed/viewer';
import { pluginTextColor, pluginTextHighlight } from 'wix-rich-content-plugin-text-color/viewer';
import { createPresets } from './utils';
import {
  viewerCustomForegroundStyleFn,
  styleSelectionPredicate,
  viewerCustomBackgroundStyleFn,
} from '../../../../../examples/main/src/text-color-style-fn';
import { pluginAccordion } from 'wix-rich-content-plugin-accordion/viewer';
import { mockFileUploadFunc } from '../../../../../examples/main/shared/utils/fileUploadUtil';

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
    enableEmbed: true,
  },
  textHighlight: {
    styleSelectionPredicate,
    customStyleFn: viewerCustomBackgroundStyleFn,
  },
  textColor: {
    styleSelectionPredicate,
    customStyleFn: viewerCustomForegroundStyleFn,
  },
  gallery: {
    scrollingElement: () => window,
    handleFileSelection: () => true,
  },
  actionButton: {
    onClick: () => {
      // eslint-disable-next-line no-alert
      window.alert('onClick event..');
    },
  },
  headersMarkdown: { hideMarkdown: true },
};

const plugins = {
  image: pluginImage({ handleFileSelection: () => true }),
  gallery: pluginGallery(configs.gallery),
  video: pluginVideo(),
  html: pluginHtml(),
  divider: pluginDivider(),
  spacing: pluginLineSpacing(),
  link: pluginLink(),
  linkPreview: pluginLinkPreview(configs.linkPreview),
  indent: pluginIndent(),
  hashtag: pluginHashtag(),
  mentions: pluginMentions(),
  codeBlock: pluginCodeBlock(),
  soundCloud: pluginSoundCloud(),
  giphy: pluginGiphy(configs.giphy),
  headers: pluginHeadersMarkdown(configs.headersMarkdown),
  map: pluginMap({ googleMapApiKey: process.env.GOOGLE_MAPS_API_KEY }),
  fileUpload: pluginFileUpload(configs.fileUpload),
  linkButton: pluginLinkButton(),
  actionButton: pluginActionButton(configs.actionButton),
  highlight: pluginTextHighlight(configs.textHighlight),
  textColor: pluginTextColor(configs.textColor),
  spoiler: pluginSpoiler(),
  accordion: pluginAccordion(),
  emoji: pluginEmoji(),
  verticalEmbed: pluginVerticalEmbed(),
};

const presets = createPresets(plugins);

export default pluginsPreset =>
  pluginsPreset
    ? pluginsPreset
        .map(plugin => presets[plugin])
        .flat()
        .filter(val => !!val)
    : presets.all;
