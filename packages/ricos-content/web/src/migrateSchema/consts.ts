import {
  MENTION_TYPE,
  LINK_TYPE,
  IMAGE_TYPE,
  DIVIDER_TYPE,
  FILE_UPLOAD_TYPE,
  GALLERY_TYPE,
  GIPHY_TYPE,
  HTML_TYPE,
  LINK_PREVIEW_TYPE,
  MAP_TYPE,
  POLL_TYPE,
  SOUND_CLOUD_TYPE,
  VIDEO_TYPE,
  VERTICAL_EMBED_TYPE,
  HEADINGS_DROPDOWN_TYPE,
  LINK_BUTTON_TYPE,
  ACTION_BUTTON_TYPE,
  CODE_BLOCK_TYPE,
  EMOJI_TYPE,
  HASHTAG_TYPE,
  HEADERS_MARKDOWN_TYPE,
  IMAGE_TYPE_LEGACY,
  INDENT_TYPE,
  LINE_SPACING_TYPE,
  SPOILER_TYPE,
  ACCORDION_TYPE,
  EXTERNAL_LINK_TYPE,
  EXTERNAL_MENTIONS_TYPE,
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  UNDO_REDO_TYPE,
  VIDEO_TYPE_LEGACY,
  TABLE_TYPE,
  ANCHOR_TYPE,
} from '../consts';
import toCamelCase from 'to-camel-case';

export enum BlockType {
  Unstyled = 'unstyled',
  // Paragraph = 'paragraph',
  HeaderOne = 'header-one',
  HeaderTwo = 'header-two',
  HeaderThree = 'header-three',
  HeaderFour = 'header-four',
  HeaderFive = 'header-five',
  HeaderSix = 'header-six',
  UnorderedListItem = 'unordered-list-item',
  OrderedListItem = 'ordered-list-item',
  Blockquote = 'blockquote',
  CodeBlock = 'code-block',
  Atomic = 'atomic',
}

export enum NodeType {
  Paragraph = 'paragraph',
  Heading = 'heading',
  UnorderedList = 'bullet_list',
  OrderedList = 'ordered_list',
  ListItem = 'list_item',
  Blockquote = 'blockquote',
  CodeBlock = 'codeblock',
  Text = 'text',
}

export enum HeaderLevel {
  'header-one' = 1,
  'header-two' = 2,
  'header-three' = 3,
  'header-four' = 4,
  'header-five' = 5,
  'header-six' = 6,
}

export enum FromDraftListType {
  'unordered-list-item' = 'bullet_list',
  'ordered-list-item' = 'ordered_list',
}

export const TO_RICOS_PLUGIN_TYPE_MAP = {
  [LINK_BUTTON_TYPE]: 'ricos-link-button',
  [ACTION_BUTTON_TYPE]: 'ricos-action-button',
  [CODE_BLOCK_TYPE]: 'ricos-code-block',
  [DIVIDER_TYPE]: 'ricos-divider',
  [EMOJI_TYPE]: 'ricos-emoji',
  EMOJI_TYPE: 'ricos-emoji',
  [FILE_UPLOAD_TYPE]: 'ricos-file-upload',
  [GALLERY_TYPE]: 'ricos-gallery',
  [GIPHY_TYPE]: 'ricos-giphy',
  [HASHTAG_TYPE]: 'ricos-hashtag',
  [HEADERS_MARKDOWN_TYPE]: 'ricos-headers-markdown',
  [HTML_TYPE]: 'ricos-html',
  [IMAGE_TYPE]: 'ricos-image',
  [IMAGE_TYPE_LEGACY]: 'ricos-image',
  [INDENT_TYPE]: 'ricos-indent',
  [LINE_SPACING_TYPE]: 'ricos-line-spacing',
  [HEADINGS_DROPDOWN_TYPE]: 'ricos-headings',
  [SPOILER_TYPE]: 'ricos-spoiler',
  [ACCORDION_TYPE]: 'ricos-accordion',
  // TODO: are both types needed?
  [EXTERNAL_LINK_TYPE]: 'ricos-external-link',
  [LINK_TYPE]: 'ricos-link',
  [LINK_PREVIEW_TYPE]: 'ricos-link-preview',
  [MAP_TYPE]: 'ricos-map',
  // TODO: are both types needed?
  [EXTERNAL_MENTIONS_TYPE]: 'ricos-external-mentions',
  [MENTION_TYPE]: 'ricos-mention',
  [SOUND_CLOUD_TYPE]: 'ricos-sound-cloud',
  [TEXT_COLOR_TYPE]: 'ricos-text-color',
  [TEXT_HIGHLIGHT_TYPE]: 'ricos-text-highlight',
  [UNDO_REDO_TYPE]: 'ricos-undo-redo',
  [VERTICAL_EMBED_TYPE]: 'ricos-vertical-embed',
  [VIDEO_TYPE]: 'ricos-video',
  [VIDEO_TYPE_LEGACY]: 'ricos-video',
  [POLL_TYPE]: 'ricos-poll',
  [TABLE_TYPE]: 'ricos-table',
  [ANCHOR_TYPE]: 'ricos-anchor',
};

// [IMAGE_TYPE]: 'ricosImage'
export const TO_RICOS_ENTITY_TYPE_MAP = Object.fromEntries(
  Object.entries(TO_RICOS_PLUGIN_TYPE_MAP).map(([key, value]) => [key, toCamelCase(value)])
);

const DUPLICATE_KEYS = ['EMOJI_TYPE', IMAGE_TYPE_LEGACY, VIDEO_TYPE_LEGACY];

// 'ricos-image': IMAGE_TYPE
export const FROM_RICOS_ENTITY_TYPE_MAP = Object.fromEntries(
  Object.entries(TO_RICOS_PLUGIN_TYPE_MAP)
    .filter(([key]) => !DUPLICATE_KEYS.includes(key))
    .map(([key, value]) => [value, key])
);
