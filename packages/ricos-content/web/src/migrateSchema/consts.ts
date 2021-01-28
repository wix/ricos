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
  LINK_BUTTON_TYPE,
  ACTION_BUTTON_TYPE,
  IMAGE_TYPE_LEGACY,
  SPOILER_TYPE,
  ACCORDION_TYPE,
  VIDEO_TYPE_LEGACY,
  TABLE_TYPE,
  ANCHOR_TYPE,
} from '../consts';
import { rich_content } from 'ricos-schema';

export enum BlockType {
  Unstyled = 'unstyled',
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

export enum HeaderLevel {
  'header-one' = 1,
  'header-two' = 2,
  'header-three' = 3,
  'header-four' = 4,
  'header-five' = 5,
  'header-six' = 6,
}

export const FROM_DRAFT_LIST_TYPE = {
  [BlockType.UnorderedListItem]: rich_content.Node.Type.BULLET_LIST,
  [BlockType.OrderedListItem]: rich_content.Node.Type.ORDERED_LIST,
};

export const TO_DRAFT_LIST_TYPE = Object.fromEntries(
  Object.entries(FROM_DRAFT_LIST_TYPE).map(([key, value]) => [value, key])
);

export const TO_RICOS_NODE_TYPE = {
  [LINK_BUTTON_TYPE]: rich_content.Node.Type.LINK_BUTTON,
  [ACTION_BUTTON_TYPE]: rich_content.Node.Type.ACTION_BUTTON,
  [DIVIDER_TYPE]: rich_content.Node.Type.DIVIDER,
  [FILE_UPLOAD_TYPE]: rich_content.Node.Type.FILE,
  [GALLERY_TYPE]: rich_content.Node.Type.GALLERY,
  [GIPHY_TYPE]: rich_content.Node.Type.GIPHY,
  [HTML_TYPE]: rich_content.Node.Type.HTML,
  [IMAGE_TYPE]: rich_content.Node.Type.IMAGE,
  [IMAGE_TYPE_LEGACY]: rich_content.Node.Type.IMAGE,
  [ACCORDION_TYPE]: rich_content.Node.Type.ACCORDION,
  [LINK_PREVIEW_TYPE]: rich_content.Node.Type.LINK_PREVIEW,
  [MAP_TYPE]: rich_content.Node.Type.MAP,
  [SOUND_CLOUD_TYPE]: rich_content.Node.Type.SOUND_CLOUD,
  [VERTICAL_EMBED_TYPE]: rich_content.Node.Type.VERTICAL_EMBED,
  [VIDEO_TYPE]: rich_content.Node.Type.VIDEO,
  [VIDEO_TYPE_LEGACY]: rich_content.Node.Type.VIDEO,
  [POLL_TYPE]: rich_content.Node.Type.POLL,
  [TABLE_TYPE]: rich_content.Node.Type.TABLE,
};

const DUPLICATE_KEYS = [IMAGE_TYPE_LEGACY, VIDEO_TYPE_LEGACY];

// rich_content.Node.Type.IMAGE: IMAGE_TYPE
export const FROM_RICOS_ENTITY_TYPE = Object.fromEntries(
  Object.entries(TO_RICOS_NODE_TYPE)
    .filter(([key]) => !DUPLICATE_KEYS.includes(key))
    .map(([key, value]) => [value, key])
);

export const TO_RICOS_DECORATION_TYPE = {
  BOLD: rich_content.Decoration.Type.BOLD,
  ITALIC: rich_content.Decoration.Type.ITALIC,
  UNDERLINE: rich_content.Decoration.Type.UNDERLINE,
  [SPOILER_TYPE]: rich_content.Decoration.Type.SPOILER,
  [ANCHOR_TYPE]: rich_content.Decoration.Type.ANCHOR,
  [MENTION_TYPE]: rich_content.Decoration.Type.MENTION,
  [LINK_TYPE]: rich_content.Decoration.Type.LINK,
};

export const TO_RICOS_PLUGIN_TYPE = {
  ...TO_RICOS_NODE_TYPE,
  ...TO_RICOS_DECORATION_TYPE,
};

// Decoration.Type.BOLD: BOLD
export const FROM_RICOS_DECORATION_TYPE = Object.fromEntries(
  Object.entries(TO_RICOS_DECORATION_TYPE).map(([key, value]) => [value, key])
);

export const ENTITY_DECORATION_TO_MUTABILITY = {
  [ANCHOR_TYPE]: 'MUTABLE',
  [LINK_TYPE]: 'MUTABLE',
  [MENTION_TYPE]: 'SEGMENTED',
  EMOJI_TYPE: 'IMMUTABLE',
};

export const RICOS_NODE_TYPE_TO_DATA_FIELD = {
  [rich_content.Node.Type.LINK_BUTTON]: 'linkButtonData',
  [rich_content.Node.Type.ACTION_BUTTON]: 'actionButtonData',
  [rich_content.Node.Type.DIVIDER]: 'dividerData',
  [rich_content.Node.Type.FILE]: 'fileData',
  [rich_content.Node.Type.GALLERY]: 'galleryData',
  [rich_content.Node.Type.GIPHY]: 'giphyData',
  [rich_content.Node.Type.HTML]: 'htmlData',
  [rich_content.Node.Type.IMAGE]: 'imageData',
  [rich_content.Node.Type.ACCORDION]: 'accordionData',
  [rich_content.Node.Type.LINK_PREVIEW]: 'linkPreviewData',
  [rich_content.Node.Type.MAP]: 'mapData',
  [rich_content.Node.Type.SOUND_CLOUD]: 'soundCloudData',
  [rich_content.Node.Type.VERTICAL_EMBED]: 'verticalEmbedData',
  [rich_content.Node.Type.VIDEO]: 'videoData',
  [rich_content.Node.Type.POLL]: 'pollData',
  [rich_content.Node.Type.TABLE]: 'tableData',
} as const;

export const DRAFT_BLOCK_TYPE_TO_DATA_FIELD = {
  [BlockType.Unstyled]: 'paragraphData',
  [BlockType.UnorderedListItem]: 'paragraphData',
  [BlockType.OrderedListItem]: 'paragraphData',
  [BlockType.HeaderOne]: 'headingData',
  [BlockType.HeaderTwo]: 'headingData',
  [BlockType.HeaderThree]: 'headingData',
  [BlockType.HeaderFour]: 'headingData',
  [BlockType.HeaderFive]: 'headingData',
  [BlockType.HeaderSix]: 'headingData',
  [BlockType.CodeBlock]: 'codeData',
  [BlockType.Blockquote]: 'quoteData',
};

// rich_content.Node.Type.IMAGE: imageData
const DRAFT_PLUGIN_TYPE_TO_DATA_FIELD = Object.fromEntries(
  Object.entries(TO_RICOS_NODE_TYPE).map(([key, value]) => [
    key,
    RICOS_NODE_TYPE_TO_DATA_FIELD[value],
  ])
);

export const ENTITY_DECORATION_TO_DATA_FIELD = {
  [ANCHOR_TYPE]: 'anchorData',
  [LINK_TYPE]: 'linkData',
  [MENTION_TYPE]: 'mentionData',
  EMOJI_TYPE: 'emojiData',
};

export const TO_RICOS_DATA_FIELD = {
  ...ENTITY_DECORATION_TO_DATA_FIELD,
  ...DRAFT_PLUGIN_TYPE_TO_DATA_FIELD,
  ...DRAFT_BLOCK_TYPE_TO_DATA_FIELD,
};
