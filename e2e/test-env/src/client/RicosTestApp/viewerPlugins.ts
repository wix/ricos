/* eslint-disable no-console */
import { pluginLinkButton, pluginActionButton } from 'ricos/button/viewer';
import { pluginCodeBlock } from 'ricos/code-block/viewer';
import { pluginDivider } from 'ricos/divider/viewer';
import { pluginEmoji } from 'ricos/emoji/viewer';
import { pluginFileUpload } from 'ricos/file/viewer';
import { pluginGallery } from 'ricos/gallery/viewer';
import { pluginGiphy } from 'ricos/giphy/viewer';
import { pluginHashtag } from 'ricos/hashtag/viewer';
import { pluginIndent } from 'ricos/indent/editor';
import { pluginHeadersMarkdown } from 'ricos/headers-markdown/viewer';
import { pluginHtml } from 'ricos/html/viewer';
import { pluginImage } from 'ricos/image/viewer';
import { pluginSpoiler } from 'ricos/spoiler/viewer';
import { pluginLineSpacing } from 'ricos/line-spacing/viewer';
import { pluginLink } from 'ricos/link/viewer';
import { pluginMap } from 'ricos/map/viewer';
import { pluginMentions } from 'ricos/mention/viewer';
import { pluginSoundCloud } from 'ricos/sound-cloud/viewer';
import { pluginVideo } from 'ricos/video/viewer';
import { pluginLinkPreview } from 'ricos/link-preview/viewer';
import { pluginVerticalEmbed } from 'ricos/vertical-embed/viewer';
import { pluginTextColor, pluginTextHighlight } from 'ricos/text-color/viewer';
import { createPresets } from './utils';
import {
  viewerCustomForegroundStyleFn,
  styleSelectionPredicate,
  viewerCustomBackgroundStyleFn,
} from '../../../../../examples/main/src/text-color-style-fn';
import { pluginAccordion } from 'ricos/accordion/viewer';
import { pluginTable } from 'ricos/table/viewer';
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
  link: { onClick: (event, data) => console.log(data) },
};

const plugins = {
  image: pluginImage(),
  gallery: pluginGallery(configs.gallery),
  video: pluginVideo(),
  html: pluginHtml(),
  divider: pluginDivider(),
  spacing: pluginLineSpacing(),
  link: pluginLink(configs.link),
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
  table: pluginTable(),
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
