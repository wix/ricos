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
} from '../consts';

export enum BlockTypesMap {
  Unstyled = 'unstyled',
  // Paragraph ='paragraph',
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

export enum FromDraftListType {
  'unordered-list-item' = 'bullet_list',
  'ordered-list-item' = 'ordered_list',
}

export enum NodeType {}

export const EntityTypeDataMap = {
  [MENTION_TYPE]: 'ricosMention',
  [LINK_TYPE]: 'ricosLink',
  [IMAGE_TYPE]: 'ricosImage',
  [DIVIDER_TYPE]: 'ricosDivider',
  [HEADINGS_DROPDOWN_TYPE]: 'ricosHeading',
  [FILE_UPLOAD_TYPE]: 'ricosFile',
  [GALLERY_TYPE]: 'ricosGallery',
  [GIPHY_TYPE]: 'ricosGiphy',
  [HTML_TYPE]: 'ricosHtml',
  [LINK_PREVIEW_TYPE]: 'ricosLinkPreview',
  [MAP_TYPE]: 'ricosMap',
  [POLL_TYPE]: 'ricosPoll',
  [SOUND_CLOUD_TYPE]: 'ricosSoundCloud',
  [VIDEO_TYPE]: 'ricosVideo',
  [VERTICAL_EMBED_TYPE]: 'ricosVerticalEmbed',
};
