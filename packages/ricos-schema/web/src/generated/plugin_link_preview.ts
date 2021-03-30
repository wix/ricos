/* eslint-disable */
export interface LinkPreviewData {
  config?: LinkPreviewConfig;
  title?: string;
  thumbnailUrl?: string;
  description?: string;
  providerUrl?: string;
  html?: string;
  socialType?: string;
}

export interface LinkPreviewConfig {
  link?: LinkPreviewConfig_Link;
  alignment?: string;
  size?: string;
  width?: number;
}

export interface LinkPreviewConfig_Link {
  url: string;
  rel?: string;
  target?: string;
}

const baseLinkPreviewData: object = {};

export const LinkPreviewData = {
  fromJSON(object: any): LinkPreviewData {
    const message = { ...baseLinkPreviewData } as LinkPreviewData;
    if (object.config !== undefined && object.config !== null) {
      message.config = LinkPreviewConfig.fromJSON(object.config);
    } else {
      message.config = undefined;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = undefined;
    }
    if (object.thumbnailUrl !== undefined && object.thumbnailUrl !== null) {
      message.thumbnailUrl = String(object.thumbnailUrl);
    } else {
      message.thumbnailUrl = undefined;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = undefined;
    }
    if (object.providerUrl !== undefined && object.providerUrl !== null) {
      message.providerUrl = String(object.providerUrl);
    } else {
      message.providerUrl = undefined;
    }
    if (object.html !== undefined && object.html !== null) {
      message.html = String(object.html);
    } else {
      message.html = undefined;
    }
    if (object.socialType !== undefined && object.socialType !== null) {
      message.socialType = String(object.socialType);
    } else {
      message.socialType = undefined;
    }
    return message;
  },

  toJSON(message: LinkPreviewData): unknown {
    const obj: any = {};
    message.config !== undefined &&
      (obj.config = message.config ? LinkPreviewConfig.toJSON(message.config) : undefined);
    message.title !== undefined && (obj.title = message.title);
    message.thumbnailUrl !== undefined && (obj.thumbnailUrl = message.thumbnailUrl);
    message.description !== undefined && (obj.description = message.description);
    message.providerUrl !== undefined && (obj.providerUrl = message.providerUrl);
    message.html !== undefined && (obj.html = message.html);
    message.socialType !== undefined && (obj.socialType = message.socialType);
    return obj;
  },
};

const baseLinkPreviewConfig: object = {};

export const LinkPreviewConfig = {
  fromJSON(object: any): LinkPreviewConfig {
    const message = { ...baseLinkPreviewConfig } as LinkPreviewConfig;
    if (object.link !== undefined && object.link !== null) {
      message.link = LinkPreviewConfig_Link.fromJSON(object.link);
    } else {
      message.link = undefined;
    }
    if (object.alignment !== undefined && object.alignment !== null) {
      message.alignment = String(object.alignment);
    } else {
      message.alignment = undefined;
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = String(object.size);
    } else {
      message.size = undefined;
    }
    if (object.width !== undefined && object.width !== null) {
      message.width = Number(object.width);
    } else {
      message.width = undefined;
    }
    return message;
  },

  toJSON(message: LinkPreviewConfig): unknown {
    const obj: any = {};
    message.link !== undefined &&
      (obj.link = message.link ? LinkPreviewConfig_Link.toJSON(message.link) : undefined);
    message.alignment !== undefined && (obj.alignment = message.alignment);
    message.size !== undefined && (obj.size = message.size);
    message.width !== undefined && (obj.width = message.width);
    return obj;
  },
};

const baseLinkPreviewConfig_Link: object = { url: '' };

export const LinkPreviewConfig_Link = {
  fromJSON(object: any): LinkPreviewConfig_Link {
    const message = { ...baseLinkPreviewConfig_Link } as LinkPreviewConfig_Link;
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = '';
    }
    if (object.rel !== undefined && object.rel !== null) {
      message.rel = String(object.rel);
    } else {
      message.rel = undefined;
    }
    if (object.target !== undefined && object.target !== null) {
      message.target = String(object.target);
    } else {
      message.target = undefined;
    }
    return message;
  },

  toJSON(message: LinkPreviewConfig_Link): unknown {
    const obj: any = {};
    message.url !== undefined && (obj.url = message.url);
    message.rel !== undefined && (obj.rel = message.rel);
    message.target !== undefined && (obj.target = message.target);
    return obj;
  },
};
