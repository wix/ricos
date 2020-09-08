import theme from '../theme/theme';
import { VIDEO_TYPE, videoTypeMapper } from 'wix-rich-content-plugin-video/dist/module.viewer';
import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/dist/module.viewer';
import { htmlTypeMapper } from 'wix-rich-content-plugin-html/dist/module.viewer';
import { soundCloudTypeMapper } from 'wix-rich-content-plugin-sound-cloud/dist/module.viewer';
import { LINK_TYPE, linkTypeMapper } from 'wix-rich-content-plugin-link/dist/module.viewer';
import {
  LINK_PREVIEW_TYPE,
  linkPreviewTypeMapper,
} from 'wix-rich-content-plugin-link-preview/dist/module.viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/module.viewer';
import {
  galleryTypeMapper,
  GALLERY_TYPE,
} from 'wix-rich-content-plugin-gallery/dist/module.viewer';
import { mapTypeMapper } from 'wix-rich-content-plugin-map/dist/module.viewer';
import { giphyTypeMapper, GIPHY_TYPE } from 'wix-rich-content-plugin-giphy/dist/module.viewer';
import { buttonTypeMapper } from 'wix-rich-content-plugin-button/dist/module.viewer';
import { HashtagDecorator } from 'wix-rich-content-plugin-hashtag/dist/module.viewer';

import {
  createHeadersMarkdownDecorator,
  HEADERS_MARKDOWN_TYPE,
} from 'wix-rich-content-plugin-headers-markdown';
import { CodeBlockDecorator } from 'wix-rich-content-plugin-code-block/dist/module.viewer';
import {
  MENTION_TYPE,
  mentionsTypeMapper,
} from 'wix-rich-content-plugin-mentions/dist/module.viewer';
import {
  fileUploadTypeMapper,
  FILE_UPLOAD_TYPE,
} from 'wix-rich-content-plugin-file-upload/dist/module.viewer';
import {
  textColorInlineStyleMapper,
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  textHighlightInlineStyleMapper,
} from 'wix-rich-content-plugin-text-color/dist/module.viewer';

import {
  viewerCustomForegroundStyleFn,
  viewerCustomBackgroundStyleFn,
  styleSelectionPredicate,
} from '../../src/text-color-style-fn';

import 'wix-rich-content-editor-common/dist/styles.min.css';
import 'wix-rich-content-plugin-commons/dist/styles.min.css';
import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-viewer/dist/styles.min.css';
// import 'wix-rich-content-plugin-code-block/dist/styles.min.css';
import 'wix-rich-content-plugin-button/dist/styles.min.css';
import 'wix-rich-content-plugin-divider/dist/styles.min.css';
import 'wix-rich-content-plugin-emoji/dist/styles.min.css';
import 'wix-rich-content-plugin-hashtag/dist/styles.min.css';
import 'wix-rich-content-plugin-html/dist/styles.min.css';
import 'wix-rich-content-plugin-image/dist/styles.min.css';
import 'wix-rich-content-plugin-gallery/dist/styles.min.css';
import 'wix-rich-content-plugin-link/dist/styles.min.css';
import 'wix-rich-content-plugin-link-preview/dist/styles.min.css';
import 'wix-rich-content-plugin-mentions/dist/styles.min.css';
import 'wix-rich-content-plugin-video/dist/styles.min.css';
import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css';
import 'wix-rich-content-plugin-map/dist/styles.min.css';
import 'wix-rich-content-plugin-file-upload/dist/styles.min.css';
import 'wix-rich-content-plugin-giphy/dist/styles.min.css';
import 'wix-rich-content-text-selection-toolbar/dist/styles.min.css';

import { getBaseUrl } from '../../src/utils';

const linkPluginSettings = {
  onClick: (event, url) => console.log('link clicked!', url),
};
const mentionsPluginSettings = {
  onMentionClick: mention => console.log('mention clicked!', mention),
  getMentionLink: () => '/link/to/mention',
};

export const typeMappers = [
  videoTypeMapper,
  buttonTypeMapper,
  dividerTypeMapper,
  htmlTypeMapper,
  linkTypeMapper,
  linkPreviewTypeMapper,
  soundCloudTypeMapper,
  mentionsTypeMapper,
  imageTypeMapper,
  galleryTypeMapper,
  mapTypeMapper,
  fileUploadTypeMapper,
  giphyTypeMapper,
];

export const config = {
  [GALLERY_TYPE]: {
    scrollingElement:
      typeof window !== 'undefined' && document.getElementsByClassName('preview-example')[0],
  },
  [GIPHY_TYPE]: {
    giphySdkApiKey: process.env.GIPHY_API_KEY,
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
  // [HTML_TYPE]: {},
  [LINK_TYPE]: linkPluginSettings,
  [LINK_PREVIEW_TYPE]: {
    enableEmbed: true,
  },
  [MENTION_TYPE]: mentionsPluginSettings,
  [TEXT_HIGHLIGHT_TYPE]: {
    styleSelectionPredicate,
    customStyleFn: viewerCustomBackgroundStyleFn,
  },
  [TEXT_COLOR_TYPE]: {
    styleSelectionPredicate,
    customStyleFn: viewerCustomForegroundStyleFn,
  },
  [FILE_UPLOAD_TYPE]: {
    resolveFileUrl: () =>
      new Promise(resolve =>
        setTimeout(
          () =>
            resolve('http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf'),
          1000
        )
      ),
  },
  [VIDEO_TYPE]: {
    getVideoUrl: src => `https://video.wixstatic.com/${src.pathname}`,
  },
};

export const getInlineStyleMappers = raw => [
  textColorInlineStyleMapper(config, raw),
  textHighlightInlineStyleMapper(config, raw),
];

export const getConfig = (additionalConfig = {}) => {
  let _config = { ...config };
  Object.keys(additionalConfig).forEach(key => {
    _config[key] = { ...(_config[key] || {}), ...(additionalConfig[key] || {}) };
  });

  return _config;
};

export const decorators = [
  new HashtagDecorator({
    theme,
    onClick: (event, text) => {
      event.preventDefault();
      console.log(`'${text}' hashtag clicked!`);
    },
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
  }),
];
