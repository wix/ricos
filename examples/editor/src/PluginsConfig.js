import { CODE_BLOCK_TYPE } from 'wix-rich-content-plugin-code-block';
import { DIVIDER_TYPE } from 'wix-rich-content-plugin-divider';
import { EXTERNAL_EMOJI_TYPE } from 'wix-rich-content-plugin-emoji';
import { HASHTAG_TYPE } from 'wix-rich-content-plugin-hashtag';
import { HTML_TYPE } from 'wix-rich-content-plugin-html';
import { LINK_TYPE } from 'wix-rich-content-plugin-link';
import { VIDEO_TYPE } from 'wix-rich-content-plugin-video';
import { GIPHY_TYPE } from 'wix-rich-content-plugin-giphy';
import { MAP_TYPE } from 'wix-rich-content-plugin-map';
import { TEXT_COLOR_TYPE } from 'wix-rich-content-plugin-text-color';
import { FILE_UPLOAD_TYPE } from 'wix-rich-content-plugin-file-upload';
import { BUTTON_TYPE } from 'wix-rich-content-plugin-button';
import { EXTERNAL_MENTIONS_TYPE } from 'wix-rich-content-plugin-mentions';
import { HEADERS_MARKDOWN_TYPE } from 'wix-rich-content-plugin-headers-markdown';
import React from 'react';
import Highlighter from 'react-highlight-words';
import casual from 'casual-browserify';

import { TOOLBARS, BUTTONS, DISPLAY_MODE } from 'wix-rich-content-common';
// import InlineToolbarDecoration from './Components/InlineToolbarDecoration';
// import StaticToolbarDecoration from './Components/StaticToolbarDecoration';
// import SideToolbarDecoration from './Components/SideToolbarDecoration';
// import PluginToolbarDecoration from './Components/PluginToolbarDecoration';

const themeColors = {
  color1: '#ffffff',
  color2: '#ed24d9',
  color3: '#969696',
  color4: '#ed24d9',
  color5: '#000000',
  color6: '#000000',
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

export default {
  [HASHTAG_TYPE]: {
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
    onClick: (event, text) => {
      event.preventDefault();
      console.log(`'${text}' hashtag clicked!`);
    },
  },
  [HTML_TYPE]: {
    htmlIframeSrc: 'http://localhost:3000/static/html-plugin-embed.html',
    minWidth: 35,
    maxWidth: 740,
    height: 250,
    width: 740,
    minHeight: 50,
    maxHeight: 350,
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
  [LINK_TYPE]: {
    onClick: (event, url) => console.log('link clicked!', url),
    // autoLink: false
  },
  [CODE_BLOCK_TYPE]: {},
  [DIVIDER_TYPE]: {},
  [EXTERNAL_EMOJI_TYPE]: {},
  [VIDEO_TYPE]: {
    toolbar: {
      hidden: [],
    },
    //Here you can call your custom video upload functionality (comment function to disable custom upload)
    handleFileSelection: (updateEntity, removeEntity) => {
      console.log('consumer wants to upload custom video');
      const videoWithAbsoluteUrl = {
        url: 'http://mirrors.standaloneinstaller.com/video-sample/jellyfish-25-mbps-hd-hevc.mp4',
      };
      const videoWithRelativeUrl = {
        pathname: 'video/441c23_84f5c058e5e4479ab9e626cd5560a21b/file',
        thumbnail: {
          pathname: 'media/441c23_84f5c058e5e4479ab9e626cd5560a21bf000.jpg',
          height: 1080,
          width: 1920,
        },
      };
      // You can provide either absolute or relative URL.
      // If relative URL is provided, a function 'getVideoUrl' will be invoked to form a full URL.
      const videoToUpload = videoWithAbsoluteUrl;
      setTimeout(() => {
        updateEntity({ data: videoToUpload });
        //updateEntity({ error: { msg: 'Upload Failed' } });
        console.log('consumer uploaded ', videoToUpload);
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
    height: 600,
    minWidth: 100,
    maxWidth: 1400,
    minHeight: 100,
    maxHeight: 1400,
    width: 740,
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
      isViewControlShown: true,
      isDraggingAllowed: true,
    },
  },
  [TEXT_COLOR_TYPE]: {
    palette: ['#FEFDFD', '#D5D4D4', '#ABCAFF', '#81B0FF', '#0261FF', '#0141AA'],
    selectionColor: 'fuchsia',
    onColorAdded: color => (userColors = [color, ...userColors]),
    getUserColors: () => userColors,
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
        url: 'http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf',
      };
      setTimeout(() => updateEntity({ data }), 1000);
    },
    // handleFileSelection: updateEntity => {
    //   const filenames = ['image.jpg', 'document.pdf', 'music.mp3'];
    //   const name = filenames[Math.floor(Math.random() * filenames.length)];
    //   const filenameParts = name.split('.');
    //   const type = filenameParts[filenameParts.length - 1];
    //   const data = {
    //     name,
    //     type,
    //     url: 'http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf',
    //   };
    //   setTimeout(() => updateEntity({ data }), 500);
    // },
  },
  [BUTTON_TYPE]: {
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
  },
  uiSettings,
  getToolbarSettings: ({ pluginButtons, textButtons, pluginTextButtons }) => [
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
    //     desktop: { displayMode:  DISPLAY_MODE.FLOATING },
    //   }),
    //   getPositionOffset: () => ({
    //     desktop: { x: 0, y: 0 },
    //   }),
    //   getToolbarDecorationFn: () => ({
    //     desktop: () => StaticToolbarDecoration
    //   })
    // },
    // {
    //   name: TOOLBARS.INLINE,
    //   shouldCreate: () => ({
    //     desktop: true,
    //     mobile: {
    //       ios: true,
    //       android: true,
    //     },
    //   }),
    //   getButtons: () => ({
    //     desktop: textButtons.desktop,
    //     mobile: {
    //       ios: textButtons.mobile,
    //       android: textButtons.mobile,
    //     },
    //   }),
    //   getTextPluginButtons: () => ({
    //     desktop: pluginTextButtons.desktop,
    //     mobile: {
    //       ios: pluginTextButtons.mobile,
    //       android: pluginTextButtons.mobile,
    //     },
    //   }),
    //   getToolbarDecorationFn: () => ({
    //     desktop: () => InlineToolbarDecoration,
    //    }),
    // },
  ],
};
