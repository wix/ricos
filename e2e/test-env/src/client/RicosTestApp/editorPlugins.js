import { pluginLinkButton, pluginActionButton } from 'wix-rich-content-plugin-button';
import { pluginCodeBlock } from 'wix-rich-content-plugin-code-block';
import { pluginDivider } from 'wix-rich-content-plugin-divider';
import { pluginEmoji } from 'wix-rich-content-plugin-emoji';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload';
import { pluginGallery } from 'wix-rich-content-plugin-gallery';
import { pluginGiphy } from 'wix-rich-content-plugin-giphy';
import { pluginHashtag } from 'wix-rich-content-plugin-hashtag';
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
import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview';
import { pluginVerticalEmbed } from 'wix-rich-content-plugin-vertical-embed';
import { mockFetchUrlPreviewData } from '../../../../../examples/main/shared/utils/linkPreviewUtil';
import { pluginTextColor, pluginTextHighlight } from 'wix-rich-content-plugin-text-color';

import { createPresets } from './utils';
import {
  customForegroundStyleFn,
  styleSelectionPredicate,
  colorScheme,
  customBackgroundStyleFn,
} from '../../../../../examples/main/src/text-color-style-fn';

const configs = {
  fileUpload: {
    accept: '*',
    handleFileSelection: updateEntity => {
      const filenames = ['image.jpg', 'document.pdf', 'music.mp3'];
      const multiple = false;
      const count = multiple ? [1, 2, 3] : [1];
      const data = [];
      count.forEach(() => {
        const name = filenames[Math.floor(Math.random() * filenames.length)];
        const filenameParts = name.split('.');
        const type = filenameParts[filenameParts.length - 1];
        data.push({
          name,
          type,
          url: 'http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf',
        });
      });
      setTimeout(() => updateEntity({ data }), 500);
    },
  },
  giphy: {
    giphySdkApiKey: process.env.GIPHY_API_KEY || 'HXSsAGVNzjeUjhKfhhD9noF8sIbpYDsV',
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
  linkPreview: {
    fetchData: mockFetchUrlPreviewData(),
    enableEmbed: true,
  },
};

const plugins = {
  image: pluginImage({ handleFileSelection: () => true }),
  gallery: pluginGallery({ handleFileSelection: () => true }),
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
  actionButton: pluginActionButton(),
  textColor: pluginTextColor({
    colorScheme,
    styleSelectionPredicate,
    customStyleFn: customForegroundStyleFn,
  }),
  emoji: pluginEmoji(),
  highlight: pluginTextHighlight({
    colorScheme,
    styleSelectionPredicate,
    customStyleFn: customBackgroundStyleFn,
  }),
  undoRedo: pluginUndoRedo(),
  verticalEmbed: pluginVerticalEmbed(),
};

const presets = createPresets(plugins);

export default pluginsPreset =>
  pluginsPreset ? pluginsPreset.map(plugin => presets[plugin]).flat() : presets.all;
