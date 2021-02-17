import React from 'react';
import { RichContentEditor, RichContentEditorProps } from 'ricos/editor';
import {
  RicosContent,
  RicosEditor,
  RicosEditorProps,
  RicosEditorType,
  RicosTheme,
  ToolbarSettings,
} from 'ricos/editor';
import { pluginLinkButton, pluginActionButton } from 'ricos/button/editor';
import { pluginCodeBlock } from 'ricos/code-block/editor';
import { pluginDivider, createDividerPlugin } from 'ricos/divider/editor';
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
import { pluginIndent } from 'ricos/indent/editor';
import { pluginLineSpacing, createLineSpacingPlugin } from 'ricos/line-spacing/editor';
import { pluginLink } from 'ricos/link/editor';
import { pluginMap, createMapPlugin } from 'ricos/map/editor';
import { pluginMentions } from 'ricos/mention/editor';
import { pluginSoundCloud } from 'ricos/sound-cloud/editor';
import { pluginUndoRedo } from 'ricos/undo-redo/editor';
import { pluginVideo } from 'ricos/video/editor';
import { pluginPoll } from 'ricos/poll/editor';
import { pluginLinkPreview, LinkPreviewProviders } from 'ricos/link-preview/editor';
import { pluginVerticalEmbed, verticalEmbedProviders } from 'ricos/vertical-embed/editor';
import { mockFetchUrlPreviewData } from '../../../main/shared/utils/linkPreviewUtil';
import {
  pluginTextColor,
  pluginTextHighlight,
  createTextColorPlugin,
} from 'ricos/text-color/editor';
import MobileDetect from 'mobile-detect';
import '../styles.global.scss';
import {
  mockFileUploadFunc,
  mockImageNativeUploadFunc,
} from '../../../main/shared/utils/fileUploadUtil';
import { MockVerticalSearchModule } from '../../../main/shared/utils/verticalEmbedUtil';

const { Instagram, Twitter, YouTube, TikTok } = LinkPreviewProviders;
const { event, booking, product } = verticalEmbedProviders;

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
    exposeEmbedButtons: [Instagram, Twitter, YouTube, TikTok],
  },
  verticalEmbed: {
    exposeEmbedButtons: [product, event, booking],
    verticalsApi: type => new MockVerticalSearchModule(type),
  },
  hashtag: {
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
    onClick: e => e.preventDefault(),
  },
  image: {
    innerRCEPlugins: [
      createTextColorPlugin,
      createLineSpacingPlugin,
      createDividerPlugin,
      createMapPlugin,
    ],
  },
};

const plugins = [
  pluginLinkButton(),
  pluginActionButton(),
  pluginCodeBlock(),
  pluginDivider(),
  pluginHeadings(),
  pluginSpoiler(),
  pluginAccordion({
    innerRCEPlugins: [
      pluginTextColor().createPlugin,
      pluginTextHighlight().createPlugin,
      pluginIndent().createPlugin,
      pluginLineSpacing().createPlugin,
      pluginLink().createPlugin,
      pluginCodeBlock().createPlugin,
    ],
  }),
  pluginTable({
    innerRCEPlugins: [
      pluginTextColor().createPlugin,
      pluginTextHighlight().createPlugin,
      pluginIndent().createPlugin,
      pluginLineSpacing().createPlugin,
      pluginLink().createPlugin,
      pluginImage().createPlugin,
      pluginVideo().createPlugin,
      pluginGiphy().createPlugin,
      pluginEmoji().createPlugin,
      pluginFileUpload().createPlugin,
      pluginCodeBlock().createPlugin,
    ],
  }),
  pluginEmoji(),
  pluginFileUpload(configs.fileUpload),
  pluginGallery(),
  pluginGiphy(configs.giphy),
  pluginHashtag(configs.hashtag),
  pluginHtml(),
  pluginImage(configs.image),
  pluginIndent(),
  pluginHeadersMarkdown(),
  pluginLineSpacing(),
  pluginLink(),
  pluginMap({ googleMapApiKey: process.env.GOOGLE_MAPS_API_KEY }),
  pluginMentions(),
  pluginSoundCloud(),
  pluginVideo({ getVideoUrl: src => `https://video.wixstatic.com/${src.pathname}` }),
  pluginLinkPreview(configs.linkPreview),
  pluginPoll(),
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
  polls: pluginPoll(),
  undoRedo: pluginUndoRedo(),
  textColor: pluginTextColor(),
  spoiler: pluginSpoiler(),
  accordion: pluginAccordion(),
  table: pluginTable(),
  highlight: pluginTextHighlight(),
  verticalEmbed: pluginVerticalEmbed(configs.verticalEmbed),
};

const mobileDetect = new MobileDetect(window.navigator.userAgent);

const addPluginMenuConfig = {
  showSearch: true,
  splitToSections: true,
};
const footerToolbarConfig = {
  morePluginsMenu: {
    splitToSections: true,
    showSearch: true,
  },
};
const getToolbarSettings = () => [
  { name: 'SIDE', addPluginMenuConfig },
  { name: 'MOBILE', addPluginMenuConfig },
  { name: 'FOOTER', footerToolbarConfig },
];

interface Props {
  content?: RicosContent;
  onChange?: RicosEditorProps['onChange'];
  isMobile?: boolean;
  pluginsToDisplay?: string[];
  toolbarSettings?: ToolbarSettings;
  onBlur?: RichContentEditorProps['onBlur'];
  onFocus?: RichContentEditorProps['onFocus'];
  theme?: RicosTheme;
}

class EditorWrapper extends React.Component<Props> {
  static defaultProps = {
    isMobile: mobileDetect.mobile() !== null,
    toolbarSettings: { getToolbarSettings },
  };
  editor: RicosEditorType;

  getToolbarProps = type => this.editor.getToolbarProps(type);

  editorPlugins = this.props.pluginsToDisplay
    ? this.props.pluginsToDisplay.map(plugin => pluginsMap[plugin])
    : plugins;

  render() {
    const { content, theme, onChange, isMobile, toolbarSettings, onBlur, onFocus } = this.props;

    return (
      <RicosEditor
        ref={ref => (this.editor = ref)}
        plugins={this.editorPlugins}
        theme={theme}
        content={content}
        isMobile={isMobile}
        placeholder={'Share something...'}
        toolbarSettings={toolbarSettings}
        onChange={onChange}
      >
        <RichContentEditor
          onFocus={onFocus}
          onBlur={onBlur}
          helpers={{ handleFileUpload: mockImageNativeUploadFunc }}
        />
      </RicosEditor>
    );
  }
}

export default EditorWrapper;
