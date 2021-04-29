/* eslint-disable */
import { Timestamp } from '../../google/protobuf/timestamp';
import { ButtonData } from '../../rich_content/v1/plugin_button';
import { CodeData } from '../../rich_content/v1/node_code';
import { DividerData } from '../../rich_content/v1/plugin_divider';
import { FileData } from '../../rich_content/v1/plugin_file';
import { GalleryData } from '../../rich_content/v1/plugin_gallery';
import { GiphyData } from '../../rich_content/v1/plugin_giphy';
import { HeadingData } from '../../rich_content/v1/node_heading';
import { HTMLData } from '../../rich_content/v1/plugin_html';
import { ImageData } from '../../rich_content/v1/plugin_image';
import { LinkPreviewData } from '../../rich_content/v1/plugin_link_preview';
import { MapData } from '../../rich_content/v1/plugin_map';
import { ParagraphData } from '../../rich_content/v1/node_paragraph';
import { PollData } from '../../rich_content/v1/plugin_poll';
import { VerticalEmbedData } from '../../rich_content/v1/plugin_vertical_embed';
import { VideoData } from '../../rich_content/v1/plugin_video';
import { AnchorData } from '../../rich_content/v1/decoration_anchor';
import { ColorData } from '../../rich_content/v1/decoration_color';
import { LinkData } from '../../rich_content/v1/decoration_link';
import { MentionData } from '../../rich_content/v1/decoration_mention';

export interface RichContent {
  /** List of nodes */
  nodes: Node[];
  metadata?: Metadata;
}

export interface Node {
  /** Node type */
  type: Node_Type;
  /** Node unique indentifier */
  key: string;
  /** List of child nodes */
  nodes: Node[];
  buttonData?: ButtonData | undefined;
  codeData?: CodeData | undefined;
  dividerData?: DividerData | undefined;
  fileData?: FileData | undefined;
  galleryData?: GalleryData | undefined;
  giphyData?: GiphyData | undefined;
  headingData?: HeadingData | undefined;
  htmlData?: HTMLData | undefined;
  imageData?: ImageData | undefined;
  linkPreviewData?: LinkPreviewData | undefined;
  mapData?: MapData | undefined;
  paragraphData?: ParagraphData | undefined;
  pollData?: PollData | undefined;
  textData?: TextData | undefined;
  verticalEmbedData?: VerticalEmbedData | undefined;
  videoData?: VideoData | undefined;
}

export const enum Node_Type {
  PARAGRAPH = 'PARAGRAPH',
  TEXT = 'TEXT',
  HEADING = 'HEADING',
  BULLET_LIST = 'BULLET_LIST',
  ORDERED_LIST = 'ORDERED_LIST',
  LIST_ITEM = 'LIST_ITEM',
  BLOCKQUOTE = 'BLOCKQUOTE',
  CODEBLOCK = 'CODEBLOCK',
  VIDEO = 'VIDEO',
  DIVIDER = 'DIVIDER',
  FILE = 'FILE',
  GALLERY = 'GALLERY',
  GIPHY = 'GIPHY',
  HTML = 'HTML',
  IMAGE = 'IMAGE',
  LINK_PREVIEW = 'LINK_PREVIEW',
  MAP = 'MAP',
  POLL = 'POLL',
  VERTICAL_EMBED = 'VERTICAL_EMBED',
  BUTTON = 'BUTTON',
  ACCORDION = 'ACCORDION',
  TABLE = 'TABLE',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function node_TypeFromJSON(object: any): Node_Type {
  switch (object) {
    case 0:
    case 'PARAGRAPH':
      return Node_Type.PARAGRAPH;
    case 1:
    case 'TEXT':
      return Node_Type.TEXT;
    case 2:
    case 'HEADING':
      return Node_Type.HEADING;
    case 3:
    case 'BULLET_LIST':
      return Node_Type.BULLET_LIST;
    case 4:
    case 'ORDERED_LIST':
      return Node_Type.ORDERED_LIST;
    case 5:
    case 'LIST_ITEM':
      return Node_Type.LIST_ITEM;
    case 6:
    case 'BLOCKQUOTE':
      return Node_Type.BLOCKQUOTE;
    case 7:
    case 'CODEBLOCK':
      return Node_Type.CODEBLOCK;
    case 8:
    case 'VIDEO':
      return Node_Type.VIDEO;
    case 9:
    case 'DIVIDER':
      return Node_Type.DIVIDER;
    case 10:
    case 'FILE':
      return Node_Type.FILE;
    case 11:
    case 'GALLERY':
      return Node_Type.GALLERY;
    case 12:
    case 'GIPHY':
      return Node_Type.GIPHY;
    case 13:
    case 'HTML':
      return Node_Type.HTML;
    case 14:
    case 'IMAGE':
      return Node_Type.IMAGE;
    case 15:
    case 'LINK_PREVIEW':
      return Node_Type.LINK_PREVIEW;
    case 16:
    case 'MAP':
      return Node_Type.MAP;
    case 17:
    case 'POLL':
      return Node_Type.POLL;
    case 18:
    case 'VERTICAL_EMBED':
      return Node_Type.VERTICAL_EMBED;
    case 19:
    case 'BUTTON':
      return Node_Type.BUTTON;
    case 20:
    case 'ACCORDION':
      return Node_Type.ACCORDION;
    case 21:
    case 'TABLE':
      return Node_Type.TABLE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return Node_Type.UNRECOGNIZED;
  }
}

export function node_TypeToJSON(object: Node_Type): string {
  switch (object) {
    case Node_Type.PARAGRAPH:
      return 'PARAGRAPH';
    case Node_Type.TEXT:
      return 'TEXT';
    case Node_Type.HEADING:
      return 'HEADING';
    case Node_Type.BULLET_LIST:
      return 'BULLET_LIST';
    case Node_Type.ORDERED_LIST:
      return 'ORDERED_LIST';
    case Node_Type.LIST_ITEM:
      return 'LIST_ITEM';
    case Node_Type.BLOCKQUOTE:
      return 'BLOCKQUOTE';
    case Node_Type.CODEBLOCK:
      return 'CODEBLOCK';
    case Node_Type.VIDEO:
      return 'VIDEO';
    case Node_Type.DIVIDER:
      return 'DIVIDER';
    case Node_Type.FILE:
      return 'FILE';
    case Node_Type.GALLERY:
      return 'GALLERY';
    case Node_Type.GIPHY:
      return 'GIPHY';
    case Node_Type.HTML:
      return 'HTML';
    case Node_Type.IMAGE:
      return 'IMAGE';
    case Node_Type.LINK_PREVIEW:
      return 'LINK_PREVIEW';
    case Node_Type.MAP:
      return 'MAP';
    case Node_Type.POLL:
      return 'POLL';
    case Node_Type.VERTICAL_EMBED:
      return 'VERTICAL_EMBED';
    case Node_Type.BUTTON:
      return 'BUTTON';
    case Node_Type.ACCORDION:
      return 'ACCORDION';
    case Node_Type.TABLE:
      return 'TABLE';
    default:
      return 'UNKNOWN';
  }
}

export interface TextData {
  /** Textual data */
  text: string;
  /** List of decorations */
  decorations: Decoration[];
}

/** Adds appearence changes to text */
export interface Decoration {
  /** Decoration type */
  type: Decoration_Type;
  anchorData?: AnchorData | undefined;
  colorData?: ColorData | undefined;
  linkData?: LinkData | undefined;
  mentionData?: MentionData | undefined;
}

export const enum Decoration_Type {
  BOLD = 'BOLD',
  ITALIC = 'ITALIC',
  UNDERLINE = 'UNDERLINE',
  SPOILER = 'SPOILER',
  ANCHOR = 'ANCHOR',
  MENTION = 'MENTION',
  LINK = 'LINK',
  COLOR = 'COLOR',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function decoration_TypeFromJSON(object: any): Decoration_Type {
  switch (object) {
    case 0:
    case 'BOLD':
      return Decoration_Type.BOLD;
    case 1:
    case 'ITALIC':
      return Decoration_Type.ITALIC;
    case 2:
    case 'UNDERLINE':
      return Decoration_Type.UNDERLINE;
    case 3:
    case 'SPOILER':
      return Decoration_Type.SPOILER;
    case 4:
    case 'ANCHOR':
      return Decoration_Type.ANCHOR;
    case 5:
    case 'MENTION':
      return Decoration_Type.MENTION;
    case 6:
    case 'LINK':
      return Decoration_Type.LINK;
    case 7:
    case 'COLOR':
      return Decoration_Type.COLOR;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return Decoration_Type.UNRECOGNIZED;
  }
}

export function decoration_TypeToJSON(object: Decoration_Type): string {
  switch (object) {
    case Decoration_Type.BOLD:
      return 'BOLD';
    case Decoration_Type.ITALIC:
      return 'ITALIC';
    case Decoration_Type.UNDERLINE:
      return 'UNDERLINE';
    case Decoration_Type.SPOILER:
      return 'SPOILER';
    case Decoration_Type.ANCHOR:
      return 'ANCHOR';
    case Decoration_Type.MENTION:
      return 'MENTION';
    case Decoration_Type.LINK:
      return 'LINK';
    case Decoration_Type.COLOR:
      return 'COLOR';
    default:
      return 'UNKNOWN';
  }
}

export interface Metadata {
  /** Schema version */
  version: number;
  /** Time content was created */
  createdTimestamp?: Date;
  /** Time of latest edit */
  updatedTimestamp?: Date;
}

const baseRichContent: object = {};

export const RichContent = {
  fromJSON(object: any): RichContent {
    const message = { ...baseRichContent } as RichContent;
    message.nodes = [];
    if (object.nodes !== undefined && object.nodes !== null) {
      for (const e of object.nodes) {
        message.nodes.push(Node.fromJSON(e));
      }
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },

  toJSON(message: RichContent): unknown {
    const obj: any = {};
    if (message.nodes) {
      obj.nodes = message.nodes.map(e => (e ? Node.toJSON(e) : undefined));
    } else {
      obj.nodes = [];
    }
    message.metadata !== undefined &&
      (obj.metadata = message.metadata ? Metadata.toJSON(message.metadata) : undefined);
    return obj;
  },
};

const baseNode: object = { type: Node_Type.PARAGRAPH, key: '' };

export const Node = {
  fromJSON(object: any): Node {
    const message = { ...baseNode } as Node;
    message.nodes = [];
    if (object.type !== undefined && object.type !== null) {
      message.type = node_TypeFromJSON(object.type);
    } else {
      message.type = Node_Type.PARAGRAPH;
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = '';
    }
    if (object.nodes !== undefined && object.nodes !== null) {
      for (const e of object.nodes) {
        message.nodes.push(Node.fromJSON(e));
      }
    }
    if (object.buttonData !== undefined && object.buttonData !== null) {
      message.buttonData = ButtonData.fromJSON(object.buttonData);
    } else {
      message.buttonData = undefined;
    }
    if (object.codeData !== undefined && object.codeData !== null) {
      message.codeData = CodeData.fromJSON(object.codeData);
    } else {
      message.codeData = undefined;
    }
    if (object.dividerData !== undefined && object.dividerData !== null) {
      message.dividerData = DividerData.fromJSON(object.dividerData);
    } else {
      message.dividerData = undefined;
    }
    if (object.fileData !== undefined && object.fileData !== null) {
      message.fileData = FileData.fromJSON(object.fileData);
    } else {
      message.fileData = undefined;
    }
    if (object.galleryData !== undefined && object.galleryData !== null) {
      message.galleryData = GalleryData.fromJSON(object.galleryData);
    } else {
      message.galleryData = undefined;
    }
    if (object.giphyData !== undefined && object.giphyData !== null) {
      message.giphyData = GiphyData.fromJSON(object.giphyData);
    } else {
      message.giphyData = undefined;
    }
    if (object.headingData !== undefined && object.headingData !== null) {
      message.headingData = HeadingData.fromJSON(object.headingData);
    } else {
      message.headingData = undefined;
    }
    if (object.htmlData !== undefined && object.htmlData !== null) {
      message.htmlData = HTMLData.fromJSON(object.htmlData);
    } else {
      message.htmlData = undefined;
    }
    if (object.imageData !== undefined && object.imageData !== null) {
      message.imageData = ImageData.fromJSON(object.imageData);
    } else {
      message.imageData = undefined;
    }
    if (object.linkPreviewData !== undefined && object.linkPreviewData !== null) {
      message.linkPreviewData = LinkPreviewData.fromJSON(object.linkPreviewData);
    } else {
      message.linkPreviewData = undefined;
    }
    if (object.mapData !== undefined && object.mapData !== null) {
      message.mapData = MapData.fromJSON(object.mapData);
    } else {
      message.mapData = undefined;
    }
    if (object.paragraphData !== undefined && object.paragraphData !== null) {
      message.paragraphData = ParagraphData.fromJSON(object.paragraphData);
    } else {
      message.paragraphData = undefined;
    }
    if (object.pollData !== undefined && object.pollData !== null) {
      message.pollData = PollData.fromJSON(object.pollData);
    } else {
      message.pollData = undefined;
    }
    if (object.textData !== undefined && object.textData !== null) {
      message.textData = TextData.fromJSON(object.textData);
    } else {
      message.textData = undefined;
    }
    if (object.verticalEmbedData !== undefined && object.verticalEmbedData !== null) {
      message.verticalEmbedData = VerticalEmbedData.fromJSON(object.verticalEmbedData);
    } else {
      message.verticalEmbedData = undefined;
    }
    if (object.videoData !== undefined && object.videoData !== null) {
      message.videoData = VideoData.fromJSON(object.videoData);
    } else {
      message.videoData = undefined;
    }
    return message;
  },

  toJSON(message: Node): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = node_TypeToJSON(message.type));
    message.key !== undefined && (obj.key = message.key);
    if (message.nodes) {
      obj.nodes = message.nodes.map(e => (e ? Node.toJSON(e) : undefined));
    } else {
      obj.nodes = [];
    }
    message.buttonData !== undefined &&
      (obj.buttonData = message.buttonData ? ButtonData.toJSON(message.buttonData) : undefined);
    message.codeData !== undefined &&
      (obj.codeData = message.codeData ? CodeData.toJSON(message.codeData) : undefined);
    message.dividerData !== undefined &&
      (obj.dividerData = message.dividerData ? DividerData.toJSON(message.dividerData) : undefined);
    message.fileData !== undefined &&
      (obj.fileData = message.fileData ? FileData.toJSON(message.fileData) : undefined);
    message.galleryData !== undefined &&
      (obj.galleryData = message.galleryData ? GalleryData.toJSON(message.galleryData) : undefined);
    message.giphyData !== undefined &&
      (obj.giphyData = message.giphyData ? GiphyData.toJSON(message.giphyData) : undefined);
    message.headingData !== undefined &&
      (obj.headingData = message.headingData ? HeadingData.toJSON(message.headingData) : undefined);
    message.htmlData !== undefined &&
      (obj.htmlData = message.htmlData ? HTMLData.toJSON(message.htmlData) : undefined);
    message.imageData !== undefined &&
      (obj.imageData = message.imageData ? ImageData.toJSON(message.imageData) : undefined);
    message.linkPreviewData !== undefined &&
      (obj.linkPreviewData = message.linkPreviewData
        ? LinkPreviewData.toJSON(message.linkPreviewData)
        : undefined);
    message.mapData !== undefined &&
      (obj.mapData = message.mapData ? MapData.toJSON(message.mapData) : undefined);
    message.paragraphData !== undefined &&
      (obj.paragraphData = message.paragraphData
        ? ParagraphData.toJSON(message.paragraphData)
        : undefined);
    message.pollData !== undefined &&
      (obj.pollData = message.pollData ? PollData.toJSON(message.pollData) : undefined);
    message.textData !== undefined &&
      (obj.textData = message.textData ? TextData.toJSON(message.textData) : undefined);
    message.verticalEmbedData !== undefined &&
      (obj.verticalEmbedData = message.verticalEmbedData
        ? VerticalEmbedData.toJSON(message.verticalEmbedData)
        : undefined);
    message.videoData !== undefined &&
      (obj.videoData = message.videoData ? VideoData.toJSON(message.videoData) : undefined);
    return obj;
  },
};

const baseTextData: object = { text: '' };

export const TextData = {
  fromJSON(object: any): TextData {
    const message = { ...baseTextData } as TextData;
    message.decorations = [];
    if (object.text !== undefined && object.text !== null) {
      message.text = String(object.text);
    } else {
      message.text = '';
    }
    if (object.decorations !== undefined && object.decorations !== null) {
      for (const e of object.decorations) {
        message.decorations.push(Decoration.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: TextData): unknown {
    const obj: any = {};
    message.text !== undefined && (obj.text = message.text);
    if (message.decorations) {
      obj.decorations = message.decorations.map(e => (e ? Decoration.toJSON(e) : undefined));
    } else {
      obj.decorations = [];
    }
    return obj;
  },
};

const baseDecoration: object = { type: Decoration_Type.BOLD };

export const Decoration = {
  fromJSON(object: any): Decoration {
    const message = { ...baseDecoration } as Decoration;
    if (object.type !== undefined && object.type !== null) {
      message.type = decoration_TypeFromJSON(object.type);
    } else {
      message.type = Decoration_Type.BOLD;
    }
    if (object.anchorData !== undefined && object.anchorData !== null) {
      message.anchorData = AnchorData.fromJSON(object.anchorData);
    } else {
      message.anchorData = undefined;
    }
    if (object.colorData !== undefined && object.colorData !== null) {
      message.colorData = ColorData.fromJSON(object.colorData);
    } else {
      message.colorData = undefined;
    }
    if (object.linkData !== undefined && object.linkData !== null) {
      message.linkData = LinkData.fromJSON(object.linkData);
    } else {
      message.linkData = undefined;
    }
    if (object.mentionData !== undefined && object.mentionData !== null) {
      message.mentionData = MentionData.fromJSON(object.mentionData);
    } else {
      message.mentionData = undefined;
    }
    return message;
  },

  toJSON(message: Decoration): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = decoration_TypeToJSON(message.type));
    message.anchorData !== undefined &&
      (obj.anchorData = message.anchorData ? AnchorData.toJSON(message.anchorData) : undefined);
    message.colorData !== undefined &&
      (obj.colorData = message.colorData ? ColorData.toJSON(message.colorData) : undefined);
    message.linkData !== undefined &&
      (obj.linkData = message.linkData ? LinkData.toJSON(message.linkData) : undefined);
    message.mentionData !== undefined &&
      (obj.mentionData = message.mentionData ? MentionData.toJSON(message.mentionData) : undefined);
    return obj;
  },
};

const baseMetadata: object = { version: 0 };

export const Metadata = {
  fromJSON(object: any): Metadata {
    const message = { ...baseMetadata } as Metadata;
    if (object.version !== undefined && object.version !== null) {
      message.version = Number(object.version);
    } else {
      message.version = 0;
    }
    if (object.createdTimestamp !== undefined && object.createdTimestamp !== null) {
      message.createdTimestamp = fromJsonTimestamp(object.createdTimestamp);
    } else {
      message.createdTimestamp = undefined;
    }
    if (object.updatedTimestamp !== undefined && object.updatedTimestamp !== null) {
      message.updatedTimestamp = fromJsonTimestamp(object.updatedTimestamp);
    } else {
      message.updatedTimestamp = undefined;
    }
    return message;
  },

  toJSON(message: Metadata): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    message.createdTimestamp !== undefined &&
      (obj.createdTimestamp =
        message.createdTimestamp !== undefined ? message.createdTimestamp.toISOString() : null);
    message.updatedTimestamp !== undefined &&
      (obj.updatedTimestamp =
        message.updatedTimestamp !== undefined ? message.updatedTimestamp.toISOString() : null);
    return obj;
  },
};

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === 'string') {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}
