import { createLinkPlugin, LINK_TYPE } from 'wix-rich-content-plugin-link';
import { createLineSpacingPlugin, LINE_SPACING_TYPE } from 'wix-rich-content-plugin-line-spacing';
import { createHashtagPlugin, HASHTAG_TYPE } from 'wix-rich-content-plugin-hashtag';
import { createEmojiPlugin, EMOJI_TYPE } from 'wix-rich-content-plugin-emoji';
import { createImagePlugin, IMAGE_TYPE } from 'wix-rich-content-plugin-image';
import { createUndoRedoPlugin, UNDO_REDO_TYPE } from 'wix-rich-content-plugin-undo-redo';
import { createGalleryPlugin, GALLERY_TYPE } from 'wix-rich-content-plugin-gallery';
import { createVideoPlugin, VIDEO_TYPE } from 'wix-rich-content-plugin-video';
import { createHtmlPlugin, HTML_TYPE } from 'wix-rich-content-plugin-html';
import { createDividerPlugin, DIVIDER_TYPE } from 'wix-rich-content-plugin-divider';
import {
  createExternalMentionsPlugin,
  EXTERNAL_MENTIONS_TYPE,
} from 'wix-rich-content-plugin-mentions';
import { createCodeBlockPlugin, CODE_BLOCK_TYPE } from 'wix-rich-content-plugin-code-block';
import { createSoundCloudPlugin, SOUND_CLOUD_TYPE } from 'wix-rich-content-plugin-sound-cloud';
import { createGiphyPlugin, GIPHY_TYPE } from 'wix-rich-content-plugin-giphy';
import {
  createHeadersMarkdownPlugin,
  HEADERS_MARKDOWN_TYPE,
} from 'wix-rich-content-plugin-headers-markdown';
import { createMapPlugin, MAP_TYPE } from 'wix-rich-content-plugin-map';
import { createFileUploadPlugin, FILE_UPLOAD_TYPE } from 'wix-rich-content-plugin-file-upload';
import {
  createTextColorPlugin,
  TEXT_COLOR_TYPE,
  createTextHighlightPlugin,
  TEXT_HIGHLIGHT_TYPE,
} from 'wix-rich-content-plugin-text-color';
import { createButtonPlugin, BUTTON_TYPE } from 'wix-rich-content-plugin-button';

export const editorPluginsParse = {
  [IMAGE_TYPE]: createImagePlugin,
  [GALLERY_TYPE]: createGalleryPlugin,
  [VIDEO_TYPE]: createVideoPlugin,
  [HTML_TYPE]: createHtmlPlugin,
  [DIVIDER_TYPE]: createDividerPlugin,
  [LINE_SPACING_TYPE]: createLineSpacingPlugin,
  [LINK_TYPE]: createLinkPlugin,
  [HASHTAG_TYPE]: createHashtagPlugin,
  [EXTERNAL_MENTIONS_TYPE]: createExternalMentionsPlugin,
  [CODE_BLOCK_TYPE]: createCodeBlockPlugin,
  [SOUND_CLOUD_TYPE]: createSoundCloudPlugin,
  [GIPHY_TYPE]: createGiphyPlugin,
  [HEADERS_MARKDOWN_TYPE]: createHeadersMarkdownPlugin,
  [MAP_TYPE]: createMapPlugin,
  [FILE_UPLOAD_TYPE]: createFileUploadPlugin,
  [BUTTON_TYPE]: createButtonPlugin,
  [TEXT_COLOR_TYPE]: createTextColorPlugin,
  [EMOJI_TYPE]: createEmojiPlugin,
  [TEXT_HIGHLIGHT_TYPE]: createTextHighlightPlugin,
  [UNDO_REDO_TYPE]: createUndoRedoPlugin,
};
