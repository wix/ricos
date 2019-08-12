import { createLinkPlugin, LINK_TYPE } from 'wix-rich-content-plugin-link';
import { createLineSpacingPlugin, LINE_SPACING_TYPE } from 'wix-rich-content-plugin-line-spacing';
import { createHashtagPlugin, HASHTAG_TYPE } from 'wix-rich-content-plugin-hashtag';
// import { createExternalEmojiPlugin, EXTERNAL_EMOJI_TYPE } from 'wix-rich-content-plugin-emoji';
import { createImagePlugin } from 'wix-rich-content-plugin-image';
import { createVideoPlugin, VIDEO_TYPE } from 'wix-rich-content-plugin-video';
import { createHtmlPlugin, HTML_TYPE } from 'wix-rich-content-plugin-html';
import { createDividerPlugin, DIVIDER_TYPE } from 'wix-rich-content-plugin-divider';
import {
  createExternalMentionsPlugin,
  EXTERNAL_MENTIONS_TYPE,
} from 'wix-rich-content-plugin-mentions';
import { createCodeBlockPlugin, CODE_BLOCK_TYPE } from 'wix-rich-content-plugin-code-block';
import { createSoundCloudPlugin } from 'wix-rich-content-plugin-sound-cloud';
import { createGiphyPlugin, GIPHY_TYPE } from 'wix-rich-content-plugin-giphy';
import { createHeadersMarkdownPlugin } from 'wix-rich-content-plugin-headers-markdown';
import { createMapPlugin, MAP_TYPE } from 'wix-rich-content-plugin-map';
import { createFileUploadPlugin, FILE_UPLOAD_TYPE } from 'wix-rich-content-plugin-file-upload';
import { createTextColorPlugin, TEXT_COLOR_TYPE } from 'wix-rich-content-plugin-text-color';
import React from 'react';
import Highlighter from 'react-highlight-words';
import casual from 'casual-browserify';

import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-editor/dist/styles.min.css';
// import 'wix-rich-content-plugin-code-block/dist/styles.min.css';
import 'wix-rich-content-plugin-divider/dist/styles.min.css';
// import 'wix-rich-content-plugin-emoji/dist/styles.min.css';
import 'wix-rich-content-plugin-html/dist/styles.min.css';
import 'wix-rich-content-plugin-hashtag/dist/styles.min.css';
import 'wix-rich-content-plugin-line-spacing/dist/styles.min.css';
import 'wix-rich-content-plugin-link/dist/styles.min.css';
import 'wix-rich-content-plugin-mentions/dist/styles.min.css';
import 'wix-rich-content-plugin-image/dist/styles.min.css';
import 'wix-rich-content-plugin-video/dist/styles.min.css';
import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css';
import 'wix-rich-content-plugin-giphy/dist/styles.min.css';
import 'wix-rich-content-plugin-map/dist/styles.min.css';
import 'wix-rich-content-plugin-file-upload/dist/styles.min.css';
import 'wix-rich-content-plugin-text-color/dist/styles.min.css';

import { customStyleFn, styleSelectionPredicate, colorScheme } from './text-color-style-fn';

const getBaseUrl = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const { hostname, port, protocol } = window.location;
  const baseUrl = `${protocol}//${hostname}`;
  return port ? `${baseUrl}:${port}` : baseUrl;
};

// import { TOOLBARS, BUTTONS, DISPLAY_MODE } from 'wix-rich-content-common';
// import InlineToolbarDecoration from './Components/InlineToolbarDecoration';
// import StaticToolbarDecoration from './Components/StaticToolbarDecoration';
// import SideToolbarDecoration from './Components/SideToolbarDecoration';
// import PluginToolbarDecoration from './Components/PluginToolbarDecoration';

export const editorPlugins = [
  createImagePlugin,
  createVideoPlugin,
  createHtmlPlugin,
  createDividerPlugin,
  // createExternalEmojiPlugin,
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
  createTextColorPlugin,
];

const themeColors = {
  color1: '#ffffff',
  color2: '#303030',
  color3: '#3a54b4',
  color4: '#bfad80',
  color5: '#bf695c',
  color6: '#f7f7f7',
  color7: '#000000',
  color8: '#9a87ce',
};

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
    for (var i = 0; i < amount; ++i) {
      items.push(casual.item);
    }
    return items;
  };

  const wordHighlighter = (textToHighlight, searchWords) => (
    <Highlighter
      searchWords={[searchWords]}
      textToHighlight={textToHighlight}
      highlightTag={({ children }) => <strong className="highlighted-text">{children}</strong>}
    />
  );

  const items = getItems();

  return {
    // isOpen: true,
    getItems: () => items,
    itemHeight: 40,
    itemToString: item => item.value,
    formatMenuItem: (item, input) => (
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
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

const uiSettings = {
  themeColors,
  linkPanel: {
    blankTargetToggleVisibilityFn: () => true,
    nofollowRelToggleVisibilityFn: () => true,
    dropDown: getLinkPanelDropDownConfig(),
  },
};

export const config = {
  [HASHTAG_TYPE]: {
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
    onClick: (event, text) => {
      event.preventDefault();
      console.log(`'${text}' hashtag clicked!`);
    },
  },
  [HTML_TYPE]: {
    htmlIframeSrc: `${getBaseUrl()}/static/html-plugin-embed.html`,
    minWidth: 35,
    maxWidth: 740,
    width: 350,
    minHeight: 50,
    maxHeight: 1200,
  },
  [EXTERNAL_MENTIONS_TYPE]: {
    repositionSuggestions: true,
    onMentionClick: mention => console.log({ mention }),
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
  [LINE_SPACING_TYPE]: {
    defaultSpacing: {
      'line-height': '1.5',
      'padding-top': '2px',
      'padding-bottom': '3px',
    },
    onUpdate: spacing => console.log(LINE_SPACING_TYPE, spacing),
  },
  [LINK_TYPE]: {
    onClick: (event, url) => console.log('link clicked!', url),
  },
  [CODE_BLOCK_TYPE]: {},
  [DIVIDER_TYPE]: {},
  [VIDEO_TYPE]: {
    toolbar: {
      hidden: [],
    },
    //Here you can call your custom video upload functionality (comment function to disable custom upload)
    handleFileSelection: updateEntity => {
      const videoWithAbsoluteUrl = {
        url: 'http://mirrors.standaloneinstaller.com/video-sample/jellyfish-25-mbps-hd-hevc.mp4',
      };
      const videoToUpload = videoWithAbsoluteUrl;
      setTimeout(() => {
        updateEntity({ data: videoToUpload });
      }, 500);
    },
    enableCustomUploadOnMobile: true,
    // Function is invoked when rendering video which has relative URL.
    // You should take the pathname and form a full URL.
    getVideoUrl: src => `https://video.wixstatic.com/${src.pathname}`,
  },
  [GIPHY_TYPE]: {
    giphySdkApiKey: process.env.GIPHY_API_KEY,
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
  },
  [FILE_UPLOAD_TYPE]: {
    accept: '*',
    onFileSelected: (file, updateEntity) => {
      const name = file.name;
      const filenameParts = name.split('.');
      const type = filenameParts[filenameParts.length - 1];

      const data = {
        name,
        type,
        url: '',
      };
      setTimeout(() => updateEntity({ data }), 1000);
    },
  },
  [TEXT_COLOR_TYPE]: {
    colorScheme,
    styleSelectionPredicate,
    customStyleFn,
    onColorAdded: color => (userColors = [color, ...userColors]),
    getUserColors: () => userColors,
  },
  uiSettings,
  getToolbarSettings: () => [],
};
