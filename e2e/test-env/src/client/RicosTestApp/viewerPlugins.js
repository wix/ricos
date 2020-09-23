/* eslint-disable no-console */
import {
  pluginLinkButton,
  pluginActionButton,
} from 'wix-rich-content-plugin-button/dist/module.viewer';
import { pluginCodeBlock } from 'wix-rich-content-plugin-code-block/dist/module.viewer';
import { pluginDivider } from 'wix-rich-content-plugin-divider/dist/module.viewer';
import { pluginEmoji } from 'wix-rich-content-plugin-emoji/dist/module.viewer';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload/dist/module.viewer';
import { pluginGallery } from 'wix-rich-content-plugin-gallery/dist/module.viewer';
import { pluginGiphy } from 'wix-rich-content-plugin-giphy/dist/module.viewer';
import { pluginHashtag } from 'wix-rich-content-plugin-hashtag/dist/module.viewer';
import { pluginIndent } from 'wix-rich-content-plugin-indent';
import { pluginHeadersMarkdown } from 'wix-rich-content-plugin-headers-markdown/dist/module.viewer';
import { pluginHtml } from 'wix-rich-content-plugin-html/dist/module.viewer';
import { pluginImage } from 'wix-rich-content-plugin-image/dist/module.viewer';
import { pluginSpoiler } from 'wix-rich-content-plugin-spoiler/dist/module.viewer';
import { pluginLineSpacing } from 'wix-rich-content-plugin-line-spacing/dist/module.viewer';
import { pluginLink } from 'wix-rich-content-plugin-link/dist/module.viewer';
import { pluginMap } from 'wix-rich-content-plugin-map/dist/module.viewer';
import { pluginMentions } from 'wix-rich-content-plugin-mentions/dist/module.viewer';
import { pluginSoundCloud } from 'wix-rich-content-plugin-sound-cloud/dist/module.viewer';
import { pluginVideo } from 'wix-rich-content-plugin-video/dist/module.viewer';
import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview/dist/module.viewer';
import { pluginVerticalEmbed } from 'wix-rich-content-plugin-vertical-embed/dist/module.viewer';
import {
  pluginTextColor,
  pluginTextHighlight,
} from 'wix-rich-content-plugin-text-color/dist/module.viewer';
import { createPresets } from './utils';
import {
  viewerCustomForegroundStyleFn,
  styleSelectionPredicate,
  viewerCustomBackgroundStyleFn,
} from '../../../../../examples/main/src/text-color-style-fn';
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
  headers: pluginHeadersMarkdown(),
  map: pluginMap({ googleMapApiKey: process.env.GOOGLE_MAPS_API_KEY }),
  fileUpload: pluginFileUpload(configs.fileUpload),
  linkButton: pluginLinkButton(),
  actionButton: pluginActionButton(configs.actionButton),
  highlight: pluginTextHighlight(configs.textHighlight),
  textColor: pluginTextColor(configs.textColor),
  spoiler: pluginSpoiler(),
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
