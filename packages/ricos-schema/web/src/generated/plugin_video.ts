/* eslint-disable */
import { Spoiler } from './common';

export interface VideoData {
  url?: string;
  src?: VideoSource | undefined;
  config?: VideoConfig;
  isCustomVideo?: boolean;
  tempData?: boolean;
  metadata?: VideoMetadata;
}

export interface VideoConfig {
  size: VideoConfig_Size;
  alignment: VideoConfig_Alignment;
  textWrap?: string;
  spoiler?: Spoiler;
}

export const enum VideoConfig_Size {
  CONTENT = 'CONTENT',
  SMALL = 'SMALL',
  FULL_WIDTH = 'FULL_WIDTH',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function videoConfig_SizeFromJSON(object: any): VideoConfig_Size {
  switch (object) {
    case 0:
    case 'CONTENT':
      return VideoConfig_Size.CONTENT;
    case 1:
    case 'SMALL':
      return VideoConfig_Size.SMALL;
    case 2:
    case 'FULL_WIDTH':
      return VideoConfig_Size.FULL_WIDTH;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return VideoConfig_Size.UNRECOGNIZED;
  }
}

export function videoConfig_SizeToJSON(object: VideoConfig_Size): string {
  switch (object) {
    case VideoConfig_Size.CONTENT:
      return 'CONTENT';
    case VideoConfig_Size.SMALL:
      return 'SMALL';
    case VideoConfig_Size.FULL_WIDTH:
      return 'FULL_WIDTH';
    default:
      return 'UNKNOWN';
  }
}

export const enum VideoConfig_Alignment {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  CENTER = 'CENTER',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function videoConfig_AlignmentFromJSON(object: any): VideoConfig_Alignment {
  switch (object) {
    case 0:
    case 'LEFT':
      return VideoConfig_Alignment.LEFT;
    case 1:
    case 'RIGHT':
      return VideoConfig_Alignment.RIGHT;
    case 2:
    case 'CENTER':
      return VideoConfig_Alignment.CENTER;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return VideoConfig_Alignment.UNRECOGNIZED;
  }
}

export function videoConfig_AlignmentToJSON(object: VideoConfig_Alignment): string {
  switch (object) {
    case VideoConfig_Alignment.LEFT:
      return 'LEFT';
    case VideoConfig_Alignment.RIGHT:
      return 'RIGHT';
    case VideoConfig_Alignment.CENTER:
      return 'CENTER';
    default:
      return 'UNKNOWN';
  }
}

export interface VideoMetadata {
  authorName?: string;
  width?: number;
  thumbnailUrl?: string;
  thumbnailWidth?: number;
  providerUrl?: string;
  type?: string;
  height?: number;
  authorUrl?: string;
  version?: string;
  providerName?: string;
  thumbnailHeight?: number;
  title?: string;
  html?: string;
  videoUrl?: string;
}

export interface VideoSource {
  pathname: string;
  thumbnail?: VideoSource_Thumbnail;
}

export interface VideoSource_Thumbnail {
  pathname?: string;
  height?: number;
  width?: number;
}

const baseVideoData: object = {};

export const VideoData = {
  fromJSON(object: any): VideoData {
    const message = { ...baseVideoData } as VideoData;
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = undefined;
    }
    if (object.src !== undefined && object.src !== null) {
      message.src = VideoSource.fromJSON(object.src);
    } else {
      message.src = undefined;
    }
    if (object.config !== undefined && object.config !== null) {
      message.config = VideoConfig.fromJSON(object.config);
    } else {
      message.config = undefined;
    }
    if (object.isCustomVideo !== undefined && object.isCustomVideo !== null) {
      message.isCustomVideo = Boolean(object.isCustomVideo);
    } else {
      message.isCustomVideo = undefined;
    }
    if (object.tempData !== undefined && object.tempData !== null) {
      message.tempData = Boolean(object.tempData);
    } else {
      message.tempData = undefined;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = VideoMetadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },

  toJSON(message: VideoData): unknown {
    const obj: any = {};
    message.url !== undefined && (obj.url = message.url);
    message.src !== undefined &&
      (obj.src = message.src ? VideoSource.toJSON(message.src) : undefined);
    message.config !== undefined &&
      (obj.config = message.config ? VideoConfig.toJSON(message.config) : undefined);
    message.isCustomVideo !== undefined && (obj.isCustomVideo = message.isCustomVideo);
    message.tempData !== undefined && (obj.tempData = message.tempData);
    message.metadata !== undefined &&
      (obj.metadata = message.metadata ? VideoMetadata.toJSON(message.metadata) : undefined);
    return obj;
  },
};

const baseVideoConfig: object = {
  size: VideoConfig_Size.CONTENT,
  alignment: VideoConfig_Alignment.LEFT,
};

export const VideoConfig = {
  fromJSON(object: any): VideoConfig {
    const message = { ...baseVideoConfig } as VideoConfig;
    if (object.size !== undefined && object.size !== null) {
      message.size = videoConfig_SizeFromJSON(object.size);
    } else {
      message.size = VideoConfig_Size.CONTENT;
    }
    if (object.alignment !== undefined && object.alignment !== null) {
      message.alignment = videoConfig_AlignmentFromJSON(object.alignment);
    } else {
      message.alignment = VideoConfig_Alignment.LEFT;
    }
    if (object.textWrap !== undefined && object.textWrap !== null) {
      message.textWrap = String(object.textWrap);
    } else {
      message.textWrap = undefined;
    }
    if (object.spoiler !== undefined && object.spoiler !== null) {
      message.spoiler = Spoiler.fromJSON(object.spoiler);
    } else {
      message.spoiler = undefined;
    }
    return message;
  },

  toJSON(message: VideoConfig): unknown {
    const obj: any = {};
    message.size !== undefined && (obj.size = videoConfig_SizeToJSON(message.size));
    message.alignment !== undefined &&
      (obj.alignment = videoConfig_AlignmentToJSON(message.alignment));
    message.textWrap !== undefined && (obj.textWrap = message.textWrap);
    message.spoiler !== undefined &&
      (obj.spoiler = message.spoiler ? Spoiler.toJSON(message.spoiler) : undefined);
    return obj;
  },
};

const baseVideoMetadata: object = {};

export const VideoMetadata = {
  fromJSON(object: any): VideoMetadata {
    const message = { ...baseVideoMetadata } as VideoMetadata;
    if (object.authorName !== undefined && object.authorName !== null) {
      message.authorName = String(object.authorName);
    } else {
      message.authorName = undefined;
    }
    if (object.width !== undefined && object.width !== null) {
      message.width = Number(object.width);
    } else {
      message.width = undefined;
    }
    if (object.thumbnailUrl !== undefined && object.thumbnailUrl !== null) {
      message.thumbnailUrl = String(object.thumbnailUrl);
    } else {
      message.thumbnailUrl = undefined;
    }
    if (object.thumbnailWidth !== undefined && object.thumbnailWidth !== null) {
      message.thumbnailWidth = Number(object.thumbnailWidth);
    } else {
      message.thumbnailWidth = undefined;
    }
    if (object.providerUrl !== undefined && object.providerUrl !== null) {
      message.providerUrl = String(object.providerUrl);
    } else {
      message.providerUrl = undefined;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = undefined;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Number(object.height);
    } else {
      message.height = undefined;
    }
    if (object.authorUrl !== undefined && object.authorUrl !== null) {
      message.authorUrl = String(object.authorUrl);
    } else {
      message.authorUrl = undefined;
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = String(object.version);
    } else {
      message.version = undefined;
    }
    if (object.providerName !== undefined && object.providerName !== null) {
      message.providerName = String(object.providerName);
    } else {
      message.providerName = undefined;
    }
    if (object.thumbnailHeight !== undefined && object.thumbnailHeight !== null) {
      message.thumbnailHeight = Number(object.thumbnailHeight);
    } else {
      message.thumbnailHeight = undefined;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = undefined;
    }
    if (object.html !== undefined && object.html !== null) {
      message.html = String(object.html);
    } else {
      message.html = undefined;
    }
    if (object.videoUrl !== undefined && object.videoUrl !== null) {
      message.videoUrl = String(object.videoUrl);
    } else {
      message.videoUrl = undefined;
    }
    return message;
  },

  toJSON(message: VideoMetadata): unknown {
    const obj: any = {};
    message.authorName !== undefined && (obj.authorName = message.authorName);
    message.width !== undefined && (obj.width = message.width);
    message.thumbnailUrl !== undefined && (obj.thumbnailUrl = message.thumbnailUrl);
    message.thumbnailWidth !== undefined && (obj.thumbnailWidth = message.thumbnailWidth);
    message.providerUrl !== undefined && (obj.providerUrl = message.providerUrl);
    message.type !== undefined && (obj.type = message.type);
    message.height !== undefined && (obj.height = message.height);
    message.authorUrl !== undefined && (obj.authorUrl = message.authorUrl);
    message.version !== undefined && (obj.version = message.version);
    message.providerName !== undefined && (obj.providerName = message.providerName);
    message.thumbnailHeight !== undefined && (obj.thumbnailHeight = message.thumbnailHeight);
    message.title !== undefined && (obj.title = message.title);
    message.html !== undefined && (obj.html = message.html);
    message.videoUrl !== undefined && (obj.videoUrl = message.videoUrl);
    return obj;
  },
};

const baseVideoSource: object = { pathname: '' };

export const VideoSource = {
  fromJSON(object: any): VideoSource {
    const message = { ...baseVideoSource } as VideoSource;
    if (object.pathname !== undefined && object.pathname !== null) {
      message.pathname = String(object.pathname);
    } else {
      message.pathname = '';
    }
    if (object.thumbnail !== undefined && object.thumbnail !== null) {
      message.thumbnail = VideoSource_Thumbnail.fromJSON(object.thumbnail);
    } else {
      message.thumbnail = undefined;
    }
    return message;
  },

  toJSON(message: VideoSource): unknown {
    const obj: any = {};
    message.pathname !== undefined && (obj.pathname = message.pathname);
    message.thumbnail !== undefined &&
      (obj.thumbnail = message.thumbnail
        ? VideoSource_Thumbnail.toJSON(message.thumbnail)
        : undefined);
    return obj;
  },
};

const baseVideoSource_Thumbnail: object = {};

export const VideoSource_Thumbnail = {
  fromJSON(object: any): VideoSource_Thumbnail {
    const message = { ...baseVideoSource_Thumbnail } as VideoSource_Thumbnail;
    if (object.pathname !== undefined && object.pathname !== null) {
      message.pathname = String(object.pathname);
    } else {
      message.pathname = undefined;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Number(object.height);
    } else {
      message.height = undefined;
    }
    if (object.width !== undefined && object.width !== null) {
      message.width = Number(object.width);
    } else {
      message.width = undefined;
    }
    return message;
  },

  toJSON(message: VideoSource_Thumbnail): unknown {
    const obj: any = {};
    message.pathname !== undefined && (obj.pathname = message.pathname);
    message.height !== undefined && (obj.height = message.height);
    message.width !== undefined && (obj.width = message.width);
    return obj;
  },
};
