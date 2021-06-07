import { Decoration_Type, Node_Type } from 'ricos-schema';

export const NODE_TYPES = [
  Node_Type.PARAGRAPH,
  Node_Type.TEXT,
  Node_Type.HEADING,
  Node_Type.BULLET_LIST,
  Node_Type.ORDERED_LIST,
  Node_Type.LIST_ITEM,
  Node_Type.BLOCKQUOTE,
  Node_Type.CODEBLOCK,
  Node_Type.VIDEO,
  Node_Type.DIVIDER,
  Node_Type.FILE,
  Node_Type.GALLERY,
  Node_Type.GIPHY,
  Node_Type.HTML,
  Node_Type.IMAGE,
  Node_Type.LINK_PREVIEW,
  Node_Type.MAP,
  Node_Type.POLL,
  Node_Type.VERTICAL_EMBED,
  Node_Type.BUTTON,
  Node_Type.COLLAPSIBLE_LIST,
  Node_Type.TABLE,
];

export const DECORATION_TYPES = [
  Decoration_Type.BOLD,
  Decoration_Type.ITALIC,
  Decoration_Type.UNDERLINE,
  Decoration_Type.SPOILER,
  Decoration_Type.ANCHOR,
  Decoration_Type.MENTION,
  Decoration_Type.LINK,
  Decoration_Type.COLOR,
];
