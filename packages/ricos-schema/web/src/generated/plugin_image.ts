/* eslint-disable */
import { Spoiler } from './common';

export interface ImageData {
  config?: ImageConfig;
  src?: ImageSource;
  metadata?: ImageMetadata;
}

export interface ImageLink {
  url: string;
  target?: string;
  rel?: string;
}

export interface ImageConfig {
  size: ImageConfig_ImageSize;
  alignment: ImageConfig_ImageAlignment;
  showTitle?: boolean;
  showDescription?: boolean;
  anchor?: string;
  link?: ImageLink;
  spoiler?: Spoiler;
  disableExpand?: boolean;
}

export const enum ImageConfig_ImageSize {
  CONTENT = 'CONTENT',
  SMALL = 'SMALL',
  ORIGINAL = 'ORIGINAL',
  FULL_WIDTH = 'FULL_WIDTH',
  INLINE = 'INLINE',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function imageConfig_ImageSizeFromJSON(object: any): ImageConfig_ImageSize {
  switch (object) {
    case 0:
    case 'CONTENT':
      return ImageConfig_ImageSize.CONTENT;
    case 1:
    case 'SMALL':
      return ImageConfig_ImageSize.SMALL;
    case 2:
    case 'ORIGINAL':
      return ImageConfig_ImageSize.ORIGINAL;
    case 3:
    case 'FULL_WIDTH':
      return ImageConfig_ImageSize.FULL_WIDTH;
    case 4:
    case 'INLINE':
      return ImageConfig_ImageSize.INLINE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return ImageConfig_ImageSize.UNRECOGNIZED;
  }
}

export function imageConfig_ImageSizeToJSON(object: ImageConfig_ImageSize): string {
  switch (object) {
    case ImageConfig_ImageSize.CONTENT:
      return 'CONTENT';
    case ImageConfig_ImageSize.SMALL:
      return 'SMALL';
    case ImageConfig_ImageSize.ORIGINAL:
      return 'ORIGINAL';
    case ImageConfig_ImageSize.FULL_WIDTH:
      return 'FULL_WIDTH';
    case ImageConfig_ImageSize.INLINE:
      return 'INLINE';
    default:
      return 'UNKNOWN';
  }
}

export const enum ImageConfig_ImageAlignment {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  CENTER = 'CENTER',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function imageConfig_ImageAlignmentFromJSON(object: any): ImageConfig_ImageAlignment {
  switch (object) {
    case 0:
    case 'LEFT':
      return ImageConfig_ImageAlignment.LEFT;
    case 1:
    case 'RIGHT':
      return ImageConfig_ImageAlignment.RIGHT;
    case 2:
    case 'CENTER':
      return ImageConfig_ImageAlignment.CENTER;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return ImageConfig_ImageAlignment.UNRECOGNIZED;
  }
}

export function imageConfig_ImageAlignmentToJSON(object: ImageConfig_ImageAlignment): string {
  switch (object) {
    case ImageConfig_ImageAlignment.LEFT:
      return 'LEFT';
    case ImageConfig_ImageAlignment.RIGHT:
      return 'RIGHT';
    case ImageConfig_ImageAlignment.CENTER:
      return 'CENTER';
    default:
      return 'UNKNOWN';
  }
}

export interface ImageSource {
  id?: string;
  originalFileName?: string;
  fileName?: string;
  width?: number;
  height?: number;
}

export interface ImageMetadata {
  alt?: string;
  caption?: string;
}

const baseImageData: object = {};

export const ImageData = {
  fromJSON(object: any): ImageData {
    const message = { ...baseImageData } as ImageData;
    if (object.config !== undefined && object.config !== null) {
      message.config = ImageConfig.fromJSON(object.config);
    } else {
      message.config = undefined;
    }
    if (object.src !== undefined && object.src !== null) {
      message.src = ImageSource.fromJSON(object.src);
    } else {
      message.src = undefined;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = ImageMetadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },

  toJSON(message: ImageData): unknown {
    const obj: any = {};
    message.config !== undefined &&
      (obj.config = message.config ? ImageConfig.toJSON(message.config) : undefined);
    message.src !== undefined &&
      (obj.src = message.src ? ImageSource.toJSON(message.src) : undefined);
    message.metadata !== undefined &&
      (obj.metadata = message.metadata ? ImageMetadata.toJSON(message.metadata) : undefined);
    return obj;
  },
};

const baseImageLink: object = { url: '' };

export const ImageLink = {
  fromJSON(object: any): ImageLink {
    const message = { ...baseImageLink } as ImageLink;
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = '';
    }
    if (object.target !== undefined && object.target !== null) {
      message.target = String(object.target);
    } else {
      message.target = undefined;
    }
    if (object.rel !== undefined && object.rel !== null) {
      message.rel = String(object.rel);
    } else {
      message.rel = undefined;
    }
    return message;
  },

  toJSON(message: ImageLink): unknown {
    const obj: any = {};
    message.url !== undefined && (obj.url = message.url);
    message.target !== undefined && (obj.target = message.target);
    message.rel !== undefined && (obj.rel = message.rel);
    return obj;
  },
};

const baseImageConfig: object = {
  size: ImageConfig_ImageSize.CONTENT,
  alignment: ImageConfig_ImageAlignment.LEFT,
};

export const ImageConfig = {
  fromJSON(object: any): ImageConfig {
    const message = { ...baseImageConfig } as ImageConfig;
    if (object.size !== undefined && object.size !== null) {
      message.size = imageConfig_ImageSizeFromJSON(object.size);
    } else {
      message.size = ImageConfig_ImageSize.CONTENT;
    }
    if (object.alignment !== undefined && object.alignment !== null) {
      message.alignment = imageConfig_ImageAlignmentFromJSON(object.alignment);
    } else {
      message.alignment = ImageConfig_ImageAlignment.LEFT;
    }
    if (object.showTitle !== undefined && object.showTitle !== null) {
      message.showTitle = Boolean(object.showTitle);
    } else {
      message.showTitle = undefined;
    }
    if (object.showDescription !== undefined && object.showDescription !== null) {
      message.showDescription = Boolean(object.showDescription);
    } else {
      message.showDescription = undefined;
    }
    if (object.anchor !== undefined && object.anchor !== null) {
      message.anchor = String(object.anchor);
    } else {
      message.anchor = undefined;
    }
    if (object.link !== undefined && object.link !== null) {
      message.link = ImageLink.fromJSON(object.link);
    } else {
      message.link = undefined;
    }
    if (object.spoiler !== undefined && object.spoiler !== null) {
      message.spoiler = Spoiler.fromJSON(object.spoiler);
    } else {
      message.spoiler = undefined;
    }
    if (object.disableExpand !== undefined && object.disableExpand !== null) {
      message.disableExpand = Boolean(object.disableExpand);
    } else {
      message.disableExpand = undefined;
    }
    return message;
  },

  toJSON(message: ImageConfig): unknown {
    const obj: any = {};
    message.size !== undefined && (obj.size = imageConfig_ImageSizeToJSON(message.size));
    message.alignment !== undefined &&
      (obj.alignment = imageConfig_ImageAlignmentToJSON(message.alignment));
    message.showTitle !== undefined && (obj.showTitle = message.showTitle);
    message.showDescription !== undefined && (obj.showDescription = message.showDescription);
    message.anchor !== undefined && (obj.anchor = message.anchor);
    message.link !== undefined &&
      (obj.link = message.link ? ImageLink.toJSON(message.link) : undefined);
    message.spoiler !== undefined &&
      (obj.spoiler = message.spoiler ? Spoiler.toJSON(message.spoiler) : undefined);
    message.disableExpand !== undefined && (obj.disableExpand = message.disableExpand);
    return obj;
  },
};

const baseImageSource: object = {};

export const ImageSource = {
  fromJSON(object: any): ImageSource {
    const message = { ...baseImageSource } as ImageSource;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = undefined;
    }
    if (object.originalFileName !== undefined && object.originalFileName !== null) {
      message.originalFileName = String(object.originalFileName);
    } else {
      message.originalFileName = undefined;
    }
    if (object.fileName !== undefined && object.fileName !== null) {
      message.fileName = String(object.fileName);
    } else {
      message.fileName = undefined;
    }
    if (object.width !== undefined && object.width !== null) {
      message.width = Number(object.width);
    } else {
      message.width = undefined;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Number(object.height);
    } else {
      message.height = undefined;
    }
    return message;
  },

  toJSON(message: ImageSource): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.originalFileName !== undefined && (obj.originalFileName = message.originalFileName);
    message.fileName !== undefined && (obj.fileName = message.fileName);
    message.width !== undefined && (obj.width = message.width);
    message.height !== undefined && (obj.height = message.height);
    return obj;
  },
};

const baseImageMetadata: object = {};

export const ImageMetadata = {
  fromJSON(object: any): ImageMetadata {
    const message = { ...baseImageMetadata } as ImageMetadata;
    if (object.alt !== undefined && object.alt !== null) {
      message.alt = String(object.alt);
    } else {
      message.alt = undefined;
    }
    if (object.caption !== undefined && object.caption !== null) {
      message.caption = String(object.caption);
    } else {
      message.caption = undefined;
    }
    return message;
  },

  toJSON(message: ImageMetadata): unknown {
    const obj: any = {};
    message.alt !== undefined && (obj.alt = message.alt);
    message.caption !== undefined && (obj.caption = message.caption);
    return obj;
  },
};
