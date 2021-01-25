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
import { Decoration, Node } from 'ricos-schema';

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
  [BlockType.UnorderedListItem]: Node.Type.BULLET_LIST,
  [BlockType.OrderedListItem]: Node.Type.ORDERED_LIST,
};

export const TO_DRAFT_LIST_TYPE = Object.fromEntries(
  Object.entries(FROM_DRAFT_LIST_TYPE).map(([key, value]) => [value, key])
);

export const TO_RICOS_PLUGIN_TYPE_MAP = {
  [LINK_BUTTON_TYPE]: Node.Type.LINK_BUTTON,
  [ACTION_BUTTON_TYPE]: Node.Type.ACTION_BUTTON,
  [DIVIDER_TYPE]: Node.Type.DIVIDER,
  [FILE_UPLOAD_TYPE]: Node.Type.FILE,
  [GALLERY_TYPE]: Node.Type.GALLERY,
  [GIPHY_TYPE]: Node.Type.GIPHY,
  [HTML_TYPE]: Node.Type.HTML,
  [IMAGE_TYPE]: Node.Type.IMAGE,
  [IMAGE_TYPE_LEGACY]: Node.Type.IMAGE,
  [ACCORDION_TYPE]: Node.Type.ACCORDION,
  [LINK_PREVIEW_TYPE]: Node.Type.LINK_PREVIEW,
  [MAP_TYPE]: Node.Type.MAP,
  [SOUND_CLOUD_TYPE]: Node.Type.SOUND_CLOUD,
  [VERTICAL_EMBED_TYPE]: Node.Type.VERTICAL_EMBED,
  [VIDEO_TYPE]: Node.Type.VIDEO,
  [VIDEO_TYPE_LEGACY]: Node.Type.VIDEO,
  [POLL_TYPE]: Node.Type.POLL,
  [TABLE_TYPE]: Node.Type.TABLE,
};

const DUPLICATE_KEYS = [IMAGE_TYPE_LEGACY, VIDEO_TYPE_LEGACY];

// Node.Type.IMAGE: IMAGE_TYPE
export const FROM_RICOS_ENTITY_TYPE_MAP = Object.fromEntries(
  Object.entries(TO_RICOS_PLUGIN_TYPE_MAP)
    .filter(([key]) => !DUPLICATE_KEYS.includes(key))
    .map(([key, value]) => [value, key])
);

export const TO_RICOS_ENTITY_TYPE = (draftType: string) => RICOS_TYPE_TO_DATA_FIELD[draftType];

export const TO_RICOS_DECORATION_TYPE = {
  BOLD: Decoration.Type.BOLD,
  ITALIC: Decoration.Type.ITALIC,
  UNDERLINE: Decoration.Type.UNDERLINE,
  [SPOILER_TYPE]: Decoration.Type.SPOILER,
  [ANCHOR_TYPE]: Decoration.Type.ANCHOR,
  [MENTION_TYPE]: Decoration.Type.MENTION,
  [LINK_TYPE]: Decoration.Type.LINK,
};

// bold: BOLD
export const FROM_RICOS_DECORATION_TYPE = Object.fromEntries(
  Object.entries(TO_RICOS_DECORATION_TYPE).map(([key, value]) => [value, key])
);

export const ENTITY_DECORATION_TO_MUTABILITY = {
  [ANCHOR_TYPE]: 'MUTABLE',
  [LINK_TYPE]: 'MUTABLE',
  [MENTION_TYPE]: 'SEGMENTED',
  EMOJI_TYPE: 'IMMUTABLE',
};

export const ENTITY_DECORATION_TO_DATA_FIELD = {
  [ANCHOR_TYPE]: 'anchorData',
  [LINK_TYPE]: 'linkData',
  [MENTION_TYPE]: 'mentionData',
  EMOJI_TYPE: 'emojiData',
};

export const RICOS_TYPE_TO_DATA_FIELD = {
  [Node.Type.LINK_BUTTON]: 'linkButtonData',
  [Node.Type.ACTION_BUTTON]: 'actionButtonData',
  [Node.Type.DIVIDER]: 'dividerData',
  [Node.Type.FILE]: 'fileUploadData',
  [Node.Type.GALLERY]: 'galleryData',
  [Node.Type.GIPHY]: 'giphyData',
  [Node.Type.HTML]: 'htmlData',
  [Node.Type.IMAGE]: 'imageData',
  [Node.Type.IMAGE]: 'imageData',
  [Node.Type.ACCORDION]: 'accordionData',
  [Node.Type.LINK_PREVIEW]: 'linkPreviewData',
  [Node.Type.MAP]: 'mapData',
  [Node.Type.SOUND_CLOUD]: 'soundCloudData',
  [Node.Type.VERTICAL_EMBED]: 'verticalEmbedData',
  [Node.Type.VIDEO]: 'videoData',
  [Node.Type.VIDEO]: 'videoData',
  [Node.Type.POLL]: 'pollData',
  [Node.Type.TABLE]: 'tableData',
};

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
