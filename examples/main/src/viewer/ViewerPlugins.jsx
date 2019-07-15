import React from 'react';
import theme from '../theme/theme';
import { videoTypeMapper } from 'wix-rich-content-plugin-video/dist/module.viewer';
import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/dist/module.viewer';
import { HTML_TYPE, htmlTypeMapper } from 'wix-rich-content-plugin-html/dist/module.viewer';
import { soundCloudTypeMapper } from 'wix-rich-content-plugin-sound-cloud/dist/module.viewer';
import { LINK_TYPE, linkTypeMapper } from 'wix-rich-content-plugin-link/dist/module.viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/module.viewer';
import { mapTypeMapper } from 'wix-rich-content-plugin-map/dist/module.viewer';
import { youtubeTypeMapper } from 'wix-rich-content-plugin-youtube/dist/module.viewer';
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
} from 'wix-rich-content-plugin-text-color/dist/module.viewer';

import { viewerCustomStyleFn, styleSelectionPredicate } from '../text-color-style-fn';
import { anchorTarget, relValue } from '../consts';

import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-viewer/dist/styles.min.css';
// import 'wix-rich-content-plugin-code-block/dist/styles.min.css';
import 'wix-rich-content-plugin-divider/dist/styles.min.css';
import 'wix-rich-content-plugin-emoji/dist/styles.min.css';
import 'wix-rich-content-plugin-hashtag/dist/styles.min.css';
import 'wix-rich-content-plugin-html/dist/styles.min.css';
import 'wix-rich-content-plugin-image/dist/styles.min.css';
import 'wix-rich-content-plugin-link/dist/styles.min.css';
import 'wix-rich-content-plugin-mentions/dist/styles.min.css';
import 'wix-rich-content-plugin-video/dist/styles.min.css';
import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css';
import 'wix-rich-content-plugin-map/dist/styles.min.css';
import 'wix-rich-content-plugin-file-upload/dist/styles.min.css';
import 'wix-rich-content-plugin-youtube/dist/styles.min.css';

import { getBaseUrl } from '../utils';

const linkPluginSettings = {
  onClick: (event, url) => console.log('link clicked!', url),
};
const mentionsPluginSettings = {
  onMentionClick: mention => console.log('mention clicked!', mention),
  getMentionLink: () => '/link/to/mention',
};

export const typeMappers = [
  videoTypeMapper,
  dividerTypeMapper,
  htmlTypeMapper,
  linkTypeMapper,
  soundCloudTypeMapper,
  mentionsTypeMapper,
  imageTypeMapper,
  mapTypeMapper,
  fileUploadTypeMapper,
  youtubeTypeMapper
];

export const config = {
  [HEADERS_MARKDOWN_TYPE]: {
    hideMarkdown: true,
  },
  [HTML_TYPE]: {
    htmlIframeSrc: `${getBaseUrl()}/static/html-plugin-embed.html`,
  },
  [LINK_TYPE]: linkPluginSettings,
  [MENTION_TYPE]: mentionsPluginSettings,
  [TEXT_COLOR_TYPE]: {
    styleSelectionPredicate,
    customStyleFn: viewerCustomStyleFn,
  },
  [FILE_UPLOAD_TYPE]: {
    resolveFileUrl: () =>
      new Promise(resolve =>
        setTimeout(
          () =>
            resolve('http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf'),
          1000,
        ),
      ),
  },
};

export const getInlineStyleMappers = raw => [textColorInlineStyleMapper(config, raw)];

export const decorators = [
  new HashtagDecorator({
    theme,
    onClick: (event, text) => {
      event.preventDefault();
      console.log(`'${text}' hashtag clicked!`);
    },
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
  }),
  new CodeBlockDecorator({ theme }),
  createHeadersMarkdownDecorator(config),
];
