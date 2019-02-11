import { CODE_BLOCK_TYPE } from "wix-rich-content-plugin-code-block";
import { DIVIDER_TYPE } from "wix-rich-content-plugin-divider";
import { EXTERNAL_EMOJI_TYPE } from "wix-rich-content-plugin-emoji";
import { HASHTAG_TYPE } from "wix-rich-content-plugin-hashtag";
import { HTML_TYPE } from "wix-rich-content-plugin-html";
import { LINK_TYPE } from "wix-rich-content-plugin-link";
import { VIDEO_TYPE } from "wix-rich-content-plugin-video";
import { GIPHY_TYPE } from "wix-rich-content-plugin-giphy";
import { MAP_TYPE } from "wix-rich-content-plugin-map";
import { EXTERNAL_MENTIONS_TYPE } from "wix-rich-content-plugin-mentions";
import { TOOLBARS, BUTTONS, DISPLAY_MODE } from "wix-rich-content-common";

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
}

const uiSettings = {
  blankTargetToggleVisibilityFn: () => true,
  nofollowRelToggleVisibilityFn: () => true,
  themeColors,
};

export default {
  [HASHTAG_TYPE]: {
    createHref: decoratedText =>
      `/search/posts?query=${encodeURIComponent("#")}${decoratedText}`,
    onClick: (event, text) => {
      event.preventDefault();
      console.log(`'${text}' hashtag clicked!`);
    }
  },
  [HTML_TYPE]: {
    htmlIframeSrc: "http://localhost:3000/static/html-plugin-embed.html",
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
              { name: "Test One", slug: "testone" },
              { name: "Test One.1", slug: "testone1" },
              { name: "Test One.2", slug: "testone2" },
              { name: "Test One.3", slug: "testone3" },
              { name: "Test One.4", slug: "testone4" },
              {
                name: "Test Two",
                slug: "testwo",
                avatar: "https://via.placeholder.com/100x100?text=Image=50"
              }
            ]),
          250
        )
      )
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
      hidden: []
    },
    //Here you can call your custom video upload functionality (comment function to disable custom upload)
    handleFileSelection: (updateEntity, removeEntity) => {
      console.log('consumer wants to upload custom video');
      const videoWithAbsoluteUrl = {
        url: 'http://mirrors.standaloneinstaller.com/video-sample/jellyfish-25-mbps-hd-hevc.mp4'
      }
      const videoWithRelativeUrl = {
        pathname: 'video/441c23_84f5c058e5e4479ab9e626cd5560a21b/file',
        thumbnail: {
          pathname: 'media/441c23_84f5c058e5e4479ab9e626cd5560a21bf000.jpg',
          height: 1080,
          width: 1920
        }
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
    getVideoUrl: src => `https://video.wixstatic.com/${src.pathname}`
  },
  [GIPHY_TYPE]: {
    giphySdkApiKey: "JfQziSTdnSwDZcD3w8DpUL4LMFu3zBgU"
  },
  [MAP_TYPE]: {
    googleMapApiKey: "AIzaSyB40ci07ioXEC6U4Rkxai2rRDiJEobv0T4",
    minWidth: 100,
    maxWidth: 740,
    minHeight: 100,
    maxHeight: 1000
  },
  uiSettings,
  getToolbarSettings: ({ pluginButtons, textButtons }) => [
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
    //   getToolbarDecorationFn: () => ({
    //     desktop: () => InlineToolbarDecoration
    //   })
    // }
  ]
};
