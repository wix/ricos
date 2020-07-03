import React from 'react';
import { createLinkPlugin, LINK_TYPE } from 'wix-rich-content-plugin-link';
import {
  createLinkPreviewPlugin,
  LINK_PREVIEW_TYPE,
  LinkPreviewProviders,
} from 'wix-rich-content-plugin-link-preview';
import { createLineSpacingPlugin, LINE_SPACING_TYPE } from 'wix-rich-content-plugin-line-spacing';
import { createHashtagPlugin, HASHTAG_TYPE } from 'wix-rich-content-plugin-hashtag';
import { createEmojiPlugin, EMOJI_TYPE } from 'wix-rich-content-plugin-emoji';
import { createImagePlugin, IMAGE_TYPE } from 'wix-rich-content-plugin-image';
import { createUndoRedoPlugin, UNDO_REDO_TYPE } from 'wix-rich-content-plugin-undo-redo';
import { createGalleryPlugin, GALLERY_TYPE } from 'wix-rich-content-plugin-gallery';
import { createVideoPlugin, VIDEO_TYPE } from 'wix-rich-content-plugin-video';
import { createHtmlPlugin, HTML_TYPE, htmlButtonsTypes } from 'wix-rich-content-plugin-html';
import { createDividerPlugin, DIVIDER_TYPE } from 'wix-rich-content-plugin-divider';
import {
  createVerticalEmbedPlugin,
  VERTICAL_EMBED_TYPE,
  verticalEmbedProviders,
} from 'wix-rich-content-plugin-vertical-embed';
import {
  createExternalMentionsPlugin,
  EXTERNAL_MENTIONS_TYPE,
} from 'wix-rich-content-plugin-mentions';
import { createCodeBlockPlugin, CODE_BLOCK_TYPE } from 'wix-rich-content-plugin-code-block';
import { createHeadingsPlugin, HEADINGS_DROPDOWN_TYPE } from 'wix-rich-content-plugin-headings';
import { createSoundCloudPlugin, SOUND_CLOUD_TYPE } from 'wix-rich-content-plugin-sound-cloud';
import { createGiphyPlugin, GIPHY_TYPE } from 'wix-rich-content-plugin-giphy';
import {
  createHeadersMarkdownPlugin,
  HEADERS_MARKDOWN_TYPE,
} from 'wix-rich-content-plugin-headers-markdown';
import { createMapPlugin, MAP_TYPE } from 'wix-rich-content-plugin-map';
import { createPollPlugin, POLL_TYPE } from 'wix-rich-content-plugin-social-polls';
import { createFileUploadPlugin, FILE_UPLOAD_TYPE } from 'wix-rich-content-plugin-file-upload';
import { createTextColorPlugin, TEXT_COLOR_TYPE } from 'wix-rich-content-plugin-text-color';
import {
  createLinkButtonPlugin,
  LINK_BUTTON_TYPE,
  createActionButtonPlugin,
  ACTION_BUTTON_TYPE,
} from 'wix-rich-content-plugin-button';
import { createTextHighlightPlugin, TEXT_HIGHLIGHT_TYPE } from 'wix-rich-content-plugin-text-color';
import Highlighter from 'react-highlight-words';
import casual from 'casual-browserify';
import { mockFetchUrlPreviewData } from '../utils/linkPreviewUtil';
import { createIndentPlugin } from 'wix-rich-content-plugin-indent';

import 'wix-rich-content-editor-common/dist/styles.min.css';
import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-editor/dist/styles.min.css';
import 'wix-rich-content-plugin-button/dist/styles.min.css';
// import 'wix-rich-content-plugin-code-block/dist/styles.min.css';
import 'wix-rich-content-plugin-divider/dist/styles.min.css';
import 'wix-rich-content-plugin-emoji/dist/styles.min.css';
import 'wix-rich-content-plugin-html/dist/styles.min.css';
import 'wix-rich-content-plugin-hashtag/dist/styles.min.css';
import 'wix-rich-content-plugin-line-spacing/dist/styles.min.css';
import 'wix-rich-content-plugin-link/dist/styles.min.css';
import 'wix-rich-content-plugin-link-preview/dist/styles.min.css';
import 'wix-rich-content-plugin-mentions/dist/styles.min.css';
import 'wix-rich-content-plugin-image/dist/styles.min.css';
import 'wix-rich-content-plugin-gallery/dist/styles.min.css';
import 'wix-rich-content-plugin-video/dist/styles.min.css';
import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css';
import 'wix-rich-content-plugin-giphy/dist/styles.min.css';
import 'wix-rich-content-plugin-map/dist/styles.min.css';
import 'wix-rich-content-plugin-social-polls/dist/styles.min.css';
import 'wix-rich-content-plugin-file-upload/dist/styles.min.css';
import 'wix-rich-content-plugin-text-color/dist/styles.min.css';
import 'wix-rich-content-plugin-headings/dist/styles.min.css';
import 'wix-rich-content-plugin-vertical-embed/dist/styles.min.css';
import {
  customForegroundStyleFn,
  styleSelectionPredicate,
  colorScheme,
  customBackgroundStyleFn,
} from '../../src/text-color-style-fn';
// import { MyCustomIcon, SizeSmallRightIcon, TOOLBARS } from 'wix-rich-content-editor-common';
import { TOOLBARS, BUTTONS, DISPLAY_MODE } from 'wix-rich-content-editor-common';
// import InlineToolbarDecoration from './Components/InlineToolbarDecoration';
// import StaticToolbarDecoration from './Components/StaticToolbarDecoration';
// import SideToolbarDecoration from './Components/SideToolbarDecoration';
// import PluginToolbarDecoration from './Components/PluginToolbarDecoration';
import MockVerticalSearchModule from '../utils/verticalEmbedUtil';
import {
  mockFileUploadFunc,
  mockVideoUploadFunc,
  mockCustomVideoUploadFunc,
} from '../utils/fileUploadUtil';

export const editorPluginsPartialPreset = [
  createImagePlugin,
  createGalleryPlugin,
  createVideoPlugin,
  createHtmlPlugin,
  createDividerPlugin,
  createLineSpacingPlugin,
  createLinkPlugin,
  createHashtagPlugin,
  createExternalMentionsPlugin,
  createCodeBlockPlugin,
  createSoundCloudPlugin,
  createGiphyPlugin,
  createHeadersMarkdownPlugin,
  createMapPlugin,
  createFileUploadPlugin,
  createLinkButtonPlugin,
  createTextColorPlugin,
  createEmojiPlugin,
  createTextHighlightPlugin,
  createUndoRedoPlugin,
];

export const editorPluginsEmbedsPreset = [
  createLinkPlugin,
  createLinkPreviewPlugin,
  createVerticalEmbedPlugin,
];

export const textPlugins = [
  createLinkPreviewPlugin,
  createVerticalEmbedPlugin,
  createIndentPlugin,
  createActionButtonPlugin,
  ...editorPluginsPartialPreset,
];

export const editorPlugins = [
  createLinkPreviewPlugin,
  createVerticalEmbedPlugin,
  createHeadingsPlugin,
  createIndentPlugin,
  createActionButtonPlugin,
  createPollPlugin,
  ...editorPluginsPartialPreset,
];

export const editorPluginsMap = {
  image: createImagePlugin,
  gallery: createGalleryPlugin,
  video: createVideoPlugin,
  html: createHtmlPlugin,
  divider: createDividerPlugin,
  spacing: createLineSpacingPlugin,
  link: createLinkPlugin,
  linkPreview: createLinkPreviewPlugin,
  indent: createIndentPlugin,
  hashtag: createHashtagPlugin,
  mentions: createExternalMentionsPlugin,
  codeBlock: createCodeBlockPlugin,
  soundCloud: createSoundCloudPlugin,
  giphy: createGiphyPlugin,
  headings: createHeadingsPlugin,
  headers: createHeadersMarkdownPlugin,
  map: createMapPlugin,
  fileUpload: createFileUploadPlugin,
  linkButton: createLinkButtonPlugin,
  actionButton: createActionButtonPlugin,
  textColor: createTextColorPlugin,
  emoji: createEmojiPlugin,
  highlight: createTextHighlightPlugin,
  undoRedo: createUndoRedoPlugin,
  verticalEmbed: createVerticalEmbedPlugin,
  polls: createPollPlugin,
  partialPreset: editorPluginsPartialPreset,
  embedsPreset: editorPluginsEmbedsPreset,
  textPlugins: textPlugins,
  all: editorPlugins,
};

const buttonDefaultPalette = ['#FEFDFD', '#D5D4D4', '#ABCAFF', '#81B0FF', '#0261FF', '#0141AA'];
let userButtonTextColors = [...buttonDefaultPalette];
let userButtonBackgroundColors = [...buttonDefaultPalette];
let userButtonBorderColors = [...buttonDefaultPalette];

const getLinkPanelDropDownConfig = () => {
  const getItems = () => {
    casual.define('item', function() {
      return {
        value: casual.url,
        label: casual.catch_phrase,
        date: casual.date('DD/MM/YY'),
      };
    });

    const items = [];
    const amount = 1000;
    for (let i = 0; i < amount; ++i) {
      items.push(casual.item);
    }
    return items;
  };

  const wordHighlighter = (textToHighlight, searchWords) => (
    <Highlighter
      searchWords={[searchWords]}
      textToHighlight={textToHighlight}
      highlightTag={({ children }) => <strong className="highlighted-text">{children}</strong>}
      autoEscape
    />
  );

  const items = getItems();

  return {
    // isOpen: true,
    getItems: () => items,
    itemHeight: 40,
    itemToString: item => item.value,
    formatMenuItem: (item, input) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px',
        }}
      >
        <span
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            paddingRight: '10px',
          }}
        >
          {wordHighlighter(item.label, input)}
        </span>
        <span>{item.date}</span>
      </div>
    ),
  };
};

let userColors = [];

export const uiSettings = {
  linkPanel: {
    blankTargetToggleVisibilityFn: () => true,
    nofollowRelToggleVisibilityFn: () => true,
    dropDown: getLinkPanelDropDownConfig(),
    //placeholder: "Enter a URL here",
  },
  // disableRightClick: true,
};

export const videoHandlers = {
  //media manager - Here you can call your custom video upload functionality (comment function to disable custom upload)
  handleFileSelection: mockCustomVideoUploadFunc,
  // this is for native file upload
  handleFileUpload: mockVideoUploadFunc,
};

const addPluginMenuConfig = {
  showSearch: true,
  splitToSections: true,
};
const footerToolbarConfig = {
  morePluginsMenu: {
    splitToSections: false,
    showSearch: true,
  },
  // pluginsToDisplayInToolbar: [EMOJI_TYPE, GALLERY_TYPE],
};

const { event, booking, product } = verticalEmbedProviders;
const buttonConfig = {
  // toolbar: {
  //   icons: {
  //     InsertPluginButtonIcon: MyCustomIcon,
  //   },
  // },
  // insertButtonTooltip: 'Custom tooltip',
  palette: ['#FEFDFD', '#D5D4D4', '#ABCAFF', '#81B0FF', '#0261FF', '#0141AA'],
  selectionBackgroundColor: 'fuchsia',
  selectionBorderColor: '#FFF',
  selectionTextColor: '#FFF',
  colors: {
    color1: '#FEFDFD',
    color2: '#D5D4D4',
    color3: '#000000',
    color4: '#000000',
    color5: '#000000',
    color6: '#ABCAFF',
    color7: '#81B0FF',
    color8: '#0261FF',
    color9: '#0141AA',
    color10: '#012055',
  },
  onTextColorAdded: color => (userButtonTextColors = [color, ...userButtonTextColors]),
  onBackgroundColorAdded: color =>
    (userButtonBackgroundColors = [color, ...userButtonBackgroundColors]),
  onBorderColorAdded: color => (userButtonBorderColors = [color, ...userButtonBorderColors]),
  getTextColors: () => userButtonTextColors,
  getBorderColors: () => userButtonBorderColors,
  getBackgroundColors: () => userButtonBackgroundColors,
};
const { Instagram, Twitter, YouTube, TikTok } = LinkPreviewProviders;
const { html, adsense } = htmlButtonsTypes;
const config = {
  [POLL_TYPE]: {
    siteToken: process.env.POLLS_API_KEY,
  },
  [LINK_PREVIEW_TYPE]: {
    enableEmbed: true, // [Twitter, YouTube]
    enableLinkPreview: true,
    fetchData: mockFetchUrlPreviewData(),
    exposeEmbedButtons: [Instagram, Twitter, YouTube, TikTok],
  },
  [EMOJI_TYPE]: {
    // toolbar: {
    //   icons: {
    //     InsertPluginButtonIcon: MyCustomIcon,
    //   },
    // },
  },
  [UNDO_REDO_TYPE]: {
    // toolbar: {
    //   icons: {
    //     Undo: MyCustomIcon, // insert plugin icon
    //     Redo: MyCustomIcon, // insert plugin icon
    //   },
    // },
  },
  [GALLERY_TYPE]: {
    // toolbar: {
    //   icons: {
    //     InsertPluginButtonIcon: MyCustomIcon,
    //   },
    // },
    // accept: 'image/*',
  },
  [IMAGE_TYPE]: {
    // defaultData: {
    //   config: {
    //     alignment: 'left',
    //     size: 'content',
    //     showTitle: true,
    //     showDescription: true,
    //   },
    // },
    imageEditorWixSettings: {
      initiator: 'some-initiator',
      siteToken:
        'JWS.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im5FUXljQzlOIn0.eyJpYXQiOjE1Njc1MjY3NzQsImRhdGEiOiJ7XCJ1c2VySWRcIjpcIjE5YTY0YTRjLWVlZTAtNGYxNC1iNjI3LTY3MmQ1ZjE2OGJkNFwiLFwibWV0YXNpdGVJZFwiOlwiNTM4ZmE2YzYtYzk1My00Y2RkLTg2YzQtNGI4NjlhZWNmOTgwXCJ9IiwiZXhwIjoxNTY4NzM2Mzc0fQ.n21OxIzSbqi8N3v30b6cIxMdshBnkkf2WQLWEFVXsLk',
      metaSiteId: '538fa6c6-c953-4cdd-86c4-4b869aecf980',
      mediaRoot: 'some-mediaRoot',
    },
    // createGalleryForMultipleImages: true,
    onImageEditorOpen: () => console.log('Media Studio Launched'),
    // toolbar: {
    //   icons: {
    //     InsertPluginButtonIcon: MyCustomIcon,
    //     alignLeft: MyCustomIcon,
    //     link: MyCustomIcon,
    //     sizeOriginal: MyCustomIcon,
    //     sizeSmallCenter: MyCustomIcon,
    //     sizeContent: MyCustomIcon,
    //     imageEditor: MyCustomIcon,
    //     sizeFullWidth: MyCustomIcon,
    //     alignCenter: MyCustomIcon,
    //     alignRight: MyCustomIcon,
    //     settings: MyCustomIcon,
    //     replace: MyCustomIcon,
    //     delete: SizeSmallRightIcon,
    //   },
    // },
    // },
  },
  [HASHTAG_TYPE]: {
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
    onClick: (event, text) => {
      event.preventDefault();
      console.log(`'${text}' hashtag clicked!`);
    },
  },
  [HTML_TYPE]: {
    minWidth: 35,
    maxWidth: 740,
    width: 350,
    minHeight: 50,
    maxHeight: 1200,
    // exposeButtons: [html, adsense],
    siteDomain: 'https://www.wix.com',
    // toolbar: {
    //   icons: {
    //     InsertPluginButtonIcon: MyCustomIcon,
    //   },
    // },
  },
  [EXTERNAL_MENTIONS_TYPE]: {
    repositionSuggestions: true,
    visibleItemsBeforeOverflow: 5,
    popoverComponent: <div />,
    handleDropdownOpen: () => console.log('mentions dropdown opened'),
    onMentionClick: mention => console.log({ mention }),
    handleDropdownClose: () => console.log('mentions dropdown closed'),
    getMentions: searchQuery =>
      new Promise(resolve =>
        setTimeout(
          () =>
            resolve([
              { name: searchQuery, slug: searchQuery },
              { name: 'Test One', slug: 'testone' },
              { name: 'Test One.1', slug: 'testone1' },
              { name: 'Test One.2', slug: 'testone2' },
              { name: 'Test One.3', slug: 'testone3' },
              { name: 'Test One.4', slug: 'testone4' },
              { name: 'Test One.5', slug: 'testone5' },
              { name: 'Test One.6', slug: 'testone6' },
              { name: 'Test One.7', slug: 'testone7' },
              { name: 'Test One.8', slug: 'testone8' },
              {
                name: 'Test Two',
                slug: 'testwo',
                avatar: 'https://via.placeholder.com/100x100?text=Image=50',
              },
            ]),
          250
        )
      ),
  },
  [HEADINGS_DROPDOWN_TYPE]: {
    // dropDownOptions: ['H2','H3']
  },
  [LINE_SPACING_TYPE]: {
    // toolbar: {
    //   icons: {
    //     InsertPluginButtonIcon: MyCustomIcon,
    //   },
    // },
    defaultSpacing: {
      'line-height': '1.5',
      'padding-top': '2px',
      'padding-bottom': '3px',
    },
    onUpdate: spacing => console.log(LINE_SPACING_TYPE, spacing),
  },
  [LINK_TYPE]: {
    // toolbar: {
    //   icons: {
    //     InsertPluginButtonIcon: MyCustomIcon,
    //   },
    // },
    onClick: (event, url) => console.log('link clicked!', url),
  },
  [SOUND_CLOUD_TYPE]: {
    // toolbar: {
    //   icons: {
    //     InsertPluginButtonIcon: MyCustomIcon,
    //   },
    // },
  },
  [CODE_BLOCK_TYPE]: {
    // toolbar: {
    //   icons: {
    //     InsertPluginButtonIcon: MyCustomIcon,
    //   },
    // },
  },
  [DIVIDER_TYPE]: {
    // toolbar: {
    //   icons: {
    //     InsertPluginButtonIcon: MyCustomIcon,
    //   },
    // },
  },
  [VERTICAL_EMBED_TYPE]: {
    verticalsApi: type => new MockVerticalSearchModule(type),
    // exposeEmbedButtons: [product, event, booking],
    exposeEmbedButtons: [product],
  },
  // [EXTERNAL_EMOJI_TYPE]: {},
  [VIDEO_TYPE]: {
    toolbar: {
      hidden: [],
      // icons: {
      //   InsertPluginButtonIcon: MyCustomIcon,
      // },
    },
    //media manager - Here you can call your custom video upload functionality (comment function to disable custom upload)
    handleFileSelection: videoHandlers.handleFileSelection,
    // this is for native file upload
    // handleFileUpload: videoHandlers.handleFileUpload,
    enableCustomUploadOnMobile: true,
    // Function is invoked when rendering video which has relative URL.
    // You should take the pathname and form a full URL.
    getVideoUrl: src => `https://video.wixstatic.com/${src.pathname}`,
  },
  [GIPHY_TYPE]: {
    giphySdkApiKey: process.env.GIPHY_API_KEY || 'HXSsAGVNzjeUjhKfhhD9noF8sIbpYDsV',
    // toolbar: {
    //   icons: {
    //     InsertPluginButtonIcon: MyCustomIcon,
    //   },
    // },
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
  [MAP_TYPE]: {
    googleMapApiKey: process.env.GOOGLE_MAPS_API_KEY,
    minWidth: 100,
    maxWidth: 740,
    minHeight: 100,
    maxHeight: 1000,
    mapSettings: {
      address: 'Wix HQ, Nemal Tel Aviv Street, Tel Aviv-Yafo, Israel',
      locationDisplayName: 'Wix HQ, Nemal Tel Aviv Street, Tel Aviv-Yafo, Israel',
      lat: 32.097235,
      lng: 34.77427,
      zoom: 18,
      mode: 'roadmap',
      isMarkerShown: true,
      isZoomControlShown: true,
      isStreetViewControlShown: true,
      isDraggingAllowed: true,
    },
    // toolbar: {
    //   icons: {
    //     InsertPluginButtonIcon: MyCustomIcon,
    //   },
    // },
  },
  [FILE_UPLOAD_TYPE]: {
    // toolbar: {
    //   icons: {
    //     InsertPluginButtonIcon: MyCustomIcon,
    //   },
    // },
    accept: '*',
    // onFileSelected: (file, updateEntity) => {
    //   const name = file.name;
    //   const filenameParts = name.split('.');
    //   const type = filenameParts[filenameParts.length - 1];

    //   const data = {
    //     name,
    //     type,
    //     url: '',
    //   };
    //   setTimeout(() => updateEntity({ data }), 1000);
    // },
    handleFileSelection: mockFileUploadFunc,
  },
  [LINK_BUTTON_TYPE]: { ...buttonConfig },
  [ACTION_BUTTON_TYPE]: {
    insertButtonTooltip: 'Add an action button',
    ...buttonConfig,
  },
  [TEXT_HIGHLIGHT_TYPE]: {
    // toolbar: {
    //   icons: {
    //     InsertPluginButtonIcon: MyCustomIcon,
    //   },
    // },
    colorScheme,
    styleSelectionPredicate,
    customStyleFn: customBackgroundStyleFn,
    onColorAdded: color => (userColors = [...userColors, color]),
    getUserColors: () => userColors,
  },
  [TEXT_COLOR_TYPE]: {
    // toolbar: {
    //   icons: {
    //     InsertPluginButtonIcon: MyCustomIcon,
    //   },
    // },
    colorScheme,
    styleSelectionPredicate,
    customStyleFn: customForegroundStyleFn,
    onColorAdded: color => (userColors = [...userColors, color]),
    getUserColors: () => userColors,
  },
  uiSettings,
  getToolbarSettings: ({ pluginButtons, textButtons }) => [
    { name: 'EXTERNAL', shouldCreate: () => ({ desktop: true }) },
    { name: 'SIDE', addPluginMenuConfig },
    { name: 'MOBILE', addPluginMenuConfig },
    { name: 'FOOTER', footerToolbarConfig },
    // {
    //   name: TOOLBARS.TEXT,
    //   getIcons: () => ({
    //     Bold: MyCustomIcon,
    //     Italic: MyCustomIcon,
    //     Underline: MyCustomIcon,
    //     Indent: MyCustomIcon,
    //     inactiveIconTitle: MyCustomIcon,
    //     TitleOne: MyCustomIcon,
    //     TitleTwo: MyCustomIcon,
    //     Blockquote: MyCustomIcon,
    //     Alignment: MyCustomIcon,
    //     AlignLeft: MyCustomIcon,
    //     AlignCenter: MyCustomIcon,
    //     AlignRight: MyCustomIcon,
    //     AlignJustify: MyCustomIcon,
    //     OrderedList: MyCustomIcon,
    //     UnorderedList: MyCustomIcon,
    //   }),
    // },
    // {
    //   name: TOOLBARS.PLUGIN,
    //   getVisibilityFn: () => ({
    //     desktop: () => true,
    //     mobile: {
    //       ios: () => true,
    //       android: () => true
    //     }
    //   }),
    //   getPositionOffset: () => ({
    //     desktop: { x: 850, y: 20 },
    //     mobile: {
    //       ios: { x: 100, y: -100 },
    //       android: { x: -100, y: -100 }
    //     }
    //   }),
    //   getDisplayOptions: () => ({
    //     desktop: { displayMode:  DISPLAY_MODE.FLOATING },
    //   }),
    //   getButtons: () => {
    //     const buttons = pluginButtons.filter(({ type }) => type !== BUTTONS.DELETE);
    //     return {
    //       desktop: buttons,
    //       mobile: {
    //         ios: buttons,
    //         android: buttons
    //       }
    //     };
    //   },
    //   getToolbarDecorationFn: () => ({
    //     desktop: () => PluginToolbarDecoration
    //   })
    // },
    // {
    //   name: TOOLBARS.SIDE,
    //   getDisplayOptions: () => ({
    //     desktop: { displayMode:  DISPLAY_MODE.FLOATING },
    //   }),
    //   getPositionOffset: () => ({
    //     desktop: { x: 1000, y: 780 },
    //     mobile: {
    //       ios: { x: 0, y: 0 },
    //       android: { x: 0, y: 0 },
    //     }
    //   }),
    //   getToolbarDecorationFn: () => ({
    //     desktop: () => SideToolbarDecoration
    //   })
    // },
    // {
    //   name: TOOLBARS.MOBILE,
    //   getDisplayOptions: () => ({
    //     mobile: {
    //       ios: { displayMode:  DISPLAY_MODE.FLOATING },
    //       android: { displayMode:  DISPLAY_MODE.FLOATING },
    //     }
    //   }),
    //   getPositionOffset: () => ({
    //     desktop: { x: 850, y: 50 },
    //     mobile: {
    //       ios: { x: 0, y: 0 },
    //       android: { x: 0, y: 0 },
    //     }
    //   })
    // },
    // {
    //   name: TOOLBARS.FOOTER,
    //   getPositionOffset: () => ({
    //     desktop: { x: 0, y: 700 },
    //     mobile: {
    //       ios: { x: 0, y: 500 },
    //     }
    //   }),
    //   getVisibilityFn: () => ({
    //     desktop: () => true,
    //     mobile: {
    //       ios: () => true,
    //       android: () => true,
    //     }
    //   }),
    //   getDisplayOptions: () => ({
    //     desktop: { displayMode:  DISPLAY_MODE.FLOATING },
    //   }),
    //   getButtons: () => ({
    //     desktop: () => [],
    //     mobile: {
    //       ios: pluginButtons.filter(({ buttonSettings }) => buttonSettings.toolbars.includes(TOOLBARS.FOOTER))
    //       .map(({ component }) => component),
    //       android: () => [],
    //     }
    //   }),
    // },
    // {
    //   name: TOOLBARS.STATIC,
    //   getVisibilityFn: () => ({
    //     desktop: () => true,
    //   }),
    //   getDisplayOptions: () => ({
    //     desktop: { displayMode: DISPLAY_MODE.FLOATING },
    //   }),
    //   getPositionOffset: () => ({
    //     desktop: { x: 300, y: 0 },
    //   }),
    //   // getToolbarDecorationFn: () => ({
    //   //   desktop: () => StaticToolbarDecoration,
    //   // }),
    // },
    // {
    //   name: TOOLBARS.INLINE,
    //   getToolbarDecorationFn: () => ({
    //     desktop: () => InlineToolbarDecoration
    //   })
    // }
  ],
};

export const getConfig = (additionalConfig = {}) => {
  let _config = { ...config };
  Object.keys(additionalConfig).forEach(key => {
    _config[key] = { ...(_config[key] || {}), ...(additionalConfig[key] || {}) };
  });

  return _config;
};
