import { CODE_BLOCK_TYPE } from 'wix-rich-content-plugin-code-block';
import { DIVIDER_TYPE } from 'wix-rich-content-plugin-divider';
import { EXTERNAL_EMOJI_TYPE } from 'wix-rich-content-plugin-emoji';
import { GALLERY_TYPE } from 'wix-rich-content-plugin-gallery';
import { HASHTAG_TYPE } from 'wix-rich-content-plugin-hashtag';
import { HTML_TYPE } from 'wix-rich-content-plugin-html';
import { IMAGE_TYPE } from 'wix-rich-content-plugin-image';
import { LINK_TYPE } from 'wix-rich-content-plugin-link';
import { VIDEO_TYPE } from 'wix-rich-content-plugin-video';
import { EXTERNAL_MENTIONS_TYPE } from 'wix-rich-content-plugin-mentions';

const uiSettings = {
  blankTargetToggleVisibilityFn: () => true,
  nofollowRelToggleVisibilityFn: () => true
};

export default {
  [HASHTAG_TYPE]: {
    createHref: decoratedText =>
      `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
    onClick: (event, text) => {
      event.preventDefault();
      console.log(`'${text}' hashtag clicked!`);
    },
  },
  [HTML_TYPE]: {
    htmlIframeSrc: 'http://localhost:3000/static/html-plugin-embed.html',
    // showInsertButtons: false,
  },
  [EXTERNAL_MENTIONS_TYPE]: {
    onMentionClick: mention => console.log({ mention }),
    getMentions: (searchQuery) => new Promise(resolve =>
      setTimeout(() => resolve([
          { name: searchQuery, slug: searchQuery },
          { name: 'Test One', slug: 'testone' },
          { name: 'Test Two', slug: 'testwo', avatar: 'https://via.placeholder.com/100x100?text=Image=50' },
        ]),
        250),
    ),
  },
  [LINK_TYPE]: { },
  [CODE_BLOCK_TYPE]: { },
  [DIVIDER_TYPE]: { },
  [EXTERNAL_EMOJI_TYPE]: { },
  [GALLERY_TYPE]: { },
  [IMAGE_TYPE]: { },
  [VIDEO_TYPE]: { },
  uiSettings,
  // getToolbarSettings: ({ pluginButtons, textButtons }) => [
  //   {
  //     name: TOOLBARS.SIDE,
  //     getVisibilityFn: () => ({
  //       desktop: () => true,
  //       mobile: {
  //         ios: () => true,
  //         android: () => true,
  //       }
  //     }),
  //   },
  //   {
  //     name: TOOLBARS.MOBILE,
  //     shouldCreate: () => ({
  //       desktop: false,
  //       mobile: {
  //         ios: false,
  //         android: false,
  //       }
  //     }),
  //   },
  //   {
  //     name: TOOLBARS.FOOTER,
  //     getPositionOffset: () => ({
  //       mobile: {
  //         ios: { x: 0, y: 500 },
  //       }
  //     }),
  //     getVisibilityFn: () => ({
  //       desktop: () => false,
  //       mobile: {
  //         ios: () => true,
  //         android: () => true,
  //       }
  //     }),
  //     shouldCreate: () => ({
  //       desktop: () => false,
  //       mobile: {
  //         ios: () => true,
  //         android: () => true,
  //       }
  //     }),
  //     getButtons: () => ({
  //       desktop: () => [],
  //       mobile: {
  //         ios: pluginButtons.filter(({ buttonSettings }) => buttonSettings.toolbars.includes(TOOLBARS.FOOTER))
  //         .map(({ component }) => component),
  //         android: () => [],
  //       }
  //     }),
  //   },
  //   {
  //     name: TOOLBARS.STATIC,
  //     getPositionOffset: () => ({
  //       desktop: { x: 40, y: 40 },
  //       mobile: {
  //         ios: { x: 40, y: 40 },
  //         android: { x: 50, y: 50 },
  //       }
  //     }),
  //     getVisibilityFn: () => ({
  //       desktop: () => false,
  //       mobile: {
  //         ios: () => true,
  //         android: () => true,
  //       }
  //     }),
  //   }
  // ]
};
