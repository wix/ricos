export const HEADER_BLOCK = Object.freeze({
  ONE: 'header-one',
  TWO: 'header-two',
  THREE: 'header-three',
  FOUR: 'header-four',
  FIVE: 'header-five',
  SIX: 'header-six',
});

export const DEFAULT_TITLE_HEADINGS = ['h2', 'h3'];

export const DEFAULT_HEADINGS = ['h2', 'h3', 'h4', 'h5', 'h6'];

export const BLOCK_TYPES = Object.freeze([
  'header-one',
  'header-two',
  'header-three',
  'header-four',
  'header-five',
  'header-six',
  'unordered-list-item',
  'ordered-list-item',
  'blockquote',
  'atomic',
  'code-block',
  'unstyled',
]);

export const UNSTYLED = 'unstyled';
export const BLOCKQUOTE = 'blockquote';

export const isListType = (type: string): boolean =>
  type === 'ordered-list-item' || type === 'unordered-list-item';

/* eslint-disable camelcase */
export const LINK_BUTTON_TYPE = 'wix-draft-plugin-link-button';
export const ACTION_BUTTON_TYPE = 'wix-draft-plugin-action-button';
export const CODE_BLOCK_TYPE = 'code-block';
export const DIVIDER_TYPE = 'wix-draft-plugin-divider';
export const EMOJI_TYPE = 'wix-draft-plugin-emoji';
export const FILE_UPLOAD_TYPE = 'wix-draft-plugin-file-upload';
export const GALLERY_TYPE = 'wix-draft-plugin-gallery';
export const GIPHY_TYPE = 'wix-draft-plugin-giphy';
export const HASHTAG_TYPE = 'wix-draft-plugin-hashtag';
export const HEADERS_MARKDOWN_TYPE = 'wix-draft-plugin-headers-markdown';
export const HTML_TYPE = 'wix-draft-plugin-html';
export const IMAGE_TYPE = 'wix-draft-plugin-image';
export const IMAGE_TYPE_LEGACY = 'IMAGE';
export const INDENT_TYPE = 'wix-rich-content-plugin-indent';
export const LINE_SPACING_TYPE = 'line-spacing';
export const HEADINGS_DROPDOWN_TYPE = 'wix-rich-content-plugin-headings';
export const SPOILER_TYPE = 'wix-rich-content-plugin-spoiler';
export const ACCORDION_TYPE = 'wix-rich-content-plugin-accordion';
export const EXTERNAL_LINK_TYPE = 'wix-draft-plugin-external-link';
export const LINK_TYPE = 'LINK';
export const LINK_PREVIEW_TYPE = 'wix-draft-plugin-link-preview';
export const MAP_TYPE = 'wix-draft-plugin-map';
export const EXTERNAL_MENTIONS_TYPE = 'wix-draft-plugin-external-mentions';
export const MENTION_TYPE = 'mention';
export const SOUND_CLOUD_TYPE = 'wix-draft-plugin-sound-cloud';
export const TEXT_COLOR_TYPE = 'wix-rich-content-text-color';
export const TEXT_HIGHLIGHT_TYPE = 'wix-rich-content-text-highlight';
export const UNDO_REDO_TYPE = 'wix-rich-content-undo-redo';
export const VERTICAL_EMBED_TYPE = 'wix-draft-plugin-vertical-embed';
export const VIDEO_TYPE = 'wix-draft-plugin-video';
export const VIDEO_TYPE_LEGACY = 'VIDEO-EMBED';
export const POLL_TYPE = 'wix-draft-plugin-poll';
export const TABLE_TYPE = 'table';
export const ANCHOR_TYPE = 'ANCHOR';
export const PREVIEW = 'PREVIEW';

// ricos plugin types
export const RICOS_ACCORDION_TYPE = 'ricos_accordion';
export const RICOS_ACTION_BUTTON_TYPE = 'ricos_action_button';
export const RICOS_ANCHOR_TYPE = 'ricos_anchor';
export const RICOS_CODE_BLOCK_TYPE = 'ricos_code_block';
export const RICOS_DIVIDER_TYPE = 'ricos_divider';
export const RICOS_EXTERNAL_LINK_TYPE = 'ricos_external_link';
export const RICOS_EXTERNAL_MENTION_TYPE = 'ricos_external_mention';
export const RICOS_FILE_TYPE = 'ricos_file';
export const RICOS_GALLERY_TYPE = 'ricos_gallery';
export const RICOS_GIPHY_TYPE = 'ricos_giphy';
export const RICOS_HASHTAG_TYPE = 'ricos_hashtag';
export const RICOS_HEADERS_MARKDOWN_TYPE = 'ricos_headers_markdown';
export const RICOS_HEADINGS_DROPDOWN_TYPE = 'ricos_heading';
export const RICOS_HTML_TYPE = 'ricos_html';
export const RICOS_IMAGE_TYPE = 'ricos_image';
export const RICOS_INDENT_TYPE = 'ricos_indent';
export const RICOS_LINE_SPACING_TYPE = 'ricos_line_spacing';
export const RICOS_LINK_BUTTON_TYPE = 'ricos_link_button';
export const RICOS_LINK_PREVIEW_TYPE = 'ricos_link_preview';
export const RICOS_LINK_TYPE = 'ricos_link';
export const RICOS_MAP_TYPE = 'ricos_map';
export const RICOS_MENTION_TYPE = 'ricos_mention';
export const RICOS_POLL_TYPE = 'ricos_poll';
export const RICOS_SOUND_CLOUD_TYPE = 'ricos_sound_cloud';
export const RICOS_SPOILER_TYPE = 'ricos_spoiler';
export const RICOS_TABLE_TYPE = 'ricos_table';
export const RICOS_TEXT_COLOR_TYPE = 'ricos_text_color';
export const RICOS_TEXT_HIGHLIGHT_TYPE = 'ricos_text_highlight';
export const RICOS_UNDO_REDO_TYPE = 'ricos_undo_redo';
export const RICOS_VERTICAL_EMBED_TYPE = 'ricos_vertical_embed';
export const RICOS_VIDEO_TYPE = 'ricos_video';

// ricos decoration types
export const RICOS_ALIGNMENT_TYPE = 'ricos_alignment';
export const RICOS_COLOR_TYPE = 'ricos_color';
export const RICOS_EMOJI_TYPE = 'ricos_emoji';
