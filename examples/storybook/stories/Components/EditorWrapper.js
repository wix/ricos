import React from 'react';
import PropTypes from 'prop-types';
import { RichContentEditor } from 'wix-rich-content-editor';
import { RicosEditor } from 'ricos-editor';
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
import { pluginIndent } from 'wix-rich-content-plugin-indent';
import { pluginLineSpacing } from 'wix-rich-content-plugin-line-spacing';
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
import { mockFetchUrlPreviewData } from '../../../main/shared/utils/linkPreviewUtil';
import { pluginTextColor, pluginTextHighlight } from 'wix-rich-content-plugin-text-color';
import '../styles.global.scss';

const { Instagram, Twitter, YouTube, TikTok } = LinkPreviewProviders;
const { event, booking, product } = verticalEmbedProviders;

const mockData = {
  id: '8b72558253b2502b401bb46e5599f22a',
  original_file_name: '8bb438_1b73a6b067b24175bd087e86613bd00c.jpg', //eslint-disable-line
  file_name: '8bb438_1b73a6b067b24175bd087e86613bd00c.jpg', //eslint-disable-line
  width: 1920,
  height: 1000,
};
const onFilesChange = (files, updateEntity) => {
  setTimeout(() => {
    updateEntity({
      data: mockData,
      files,
    });
  }, 500);
};
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
    exposeEmbedButtons: [Instagram, Twitter, YouTube, TikTok],
  },
  verticalEmbed: {
    exposeEmbedButtons: [product, event, booking],
  },
  hashtag: {
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
    onClick: e => e.preventDefault(),
  },
};

const plugins = [
  pluginLinkButton(),
  pluginActionButton(),
  pluginCodeBlock(),
  pluginDivider(),
  pluginEmoji(),
  pluginFileUpload(configs.fileUpload),
  pluginGallery(),
  pluginGiphy(configs.giphy),
  pluginHashtag(configs.hashtag),
  pluginHtml(),
  pluginImage(),
  pluginIndent(),
  pluginHeadersMarkdown(),
  pluginLineSpacing(),
  pluginLink(),
  pluginMap({ googleMapApiKey: process.env.GOOGLE_MAPS_API_KEY }),
  pluginMentions(),
  pluginSoundCloud(),
  pluginVideo(),
  pluginLinkPreview(configs.linkPreview),
  pluginUndoRedo(),
  pluginTextColor(),
  pluginTextHighlight(),
  pluginVerticalEmbed(configs.verticalEmbed),
];

const pluginsMap = {
  button: pluginLinkButton(),
  codeBlock: pluginCodeBlock(),
  divider: pluginDivider(),
  emoji: pluginEmoji(),
  fileUpload: pluginFileUpload(configs.fileUpload),
  gallery: pluginGallery(),
  gif: pluginGiphy(configs.giphy),
  hashtag: pluginHashtag(),
  html: pluginHtml(),
  image: pluginImage(),
  indent: pluginIndent(),
  headers: pluginHeadersMarkdown(),
  lineSpacing: pluginLineSpacing(),
  link: pluginLink(),
  map: pluginMap({ googleMapApiKey: process.env.GOOGLE_MAPS_API_KEY }),
  mentions: pluginMentions(),
  soundCloud: pluginSoundCloud(),
  video: pluginVideo(),
  socialEmbed: pluginLinkPreview(configs.linkPreview),
  undoRedo: pluginUndoRedo(),
  textColor: pluginTextColor(),
  highlight: pluginTextHighlight(),
  verticalEmbed: pluginVerticalEmbed(configs.verticalEmbed),
};

const EditorWrapper = ({
  content,
  palette,
  onChange,
  config,
  isMobile = false,
  pluginsToDisplay,
  toolbarSettings,
}) => {
  const editorPlugins = pluginsToDisplay
    ? pluginsToDisplay.map(plugin => pluginsMap[plugin])
    : plugins;
  return (
    <RicosEditor
      plugins={editorPlugins}
      theme={{ palette }}
      content={content}
      isMobile={isMobile}
      placeholder={'Share something...'}
      toolbarSettings={toolbarSettings}
      onChange={onChange}
    >
      <RichContentEditor helpers={{ onFilesChange }} config={config} />
    </RicosEditor>
  );
};

EditorWrapper.propTypes = {
  content: PropTypes.object,
  palette: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  isMobile: PropTypes.bool,
  pluginsToDisplay: PropTypes.arrayOf(PropTypes.string),
  toolbarSettings: PropTypes.object,
  config: PropTypes.object,
};

export default EditorWrapper;
