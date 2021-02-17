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
import { pluginLinkButton, pluginActionButton } from 'ricos/button';
import { pluginCodeBlock } from 'ricos/code-block';
import { pluginDivider, createDividerPlugin } from 'ricos/divider';
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
import { pluginIndent } from 'ricos/indent';
import { pluginLineSpacing, createLineSpacingPlugin } from 'ricos/line-spacing';
import { pluginLink } from 'ricos/link';
import { pluginMap, createMapPlugin } from 'ricos/map';
import { pluginMentions } from 'ricos/mentions';
import { pluginSoundCloud } from 'ricos/sound-cloud';
import { pluginUndoRedo } from 'ricos/undo-redo';
import { pluginVideo } from 'ricos/video';
import { pluginPoll } from 'ricos/social-polls';
import { pluginLinkPreview, LinkPreviewProviders } from 'ricos/link-preview';
import { pluginVerticalEmbed, verticalEmbedProviders } from 'ricos/vertical-embed';
import { mockFetchUrlPreviewData } from '../../../main/shared/utils/linkPreviewUtil';
import { pluginTextColor, pluginTextHighlight, createTextColorPlugin } from 'ricos/text-color';
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
