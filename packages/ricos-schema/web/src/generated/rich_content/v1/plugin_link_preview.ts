/* eslint-disable */
import { PluginContainerData, Link } from '../../rich_content/v1/common';

export interface LinkPreviewData {
  containerData?: PluginContainerData;
  config?: LinkPreviewConfig;
  title?: string;
  thumbnailUrl?: string;
  description?: string;
  providerUrl?: string;
  html?: string;
  socialType?: string;
}

export interface LinkPreviewConfig {
  link?: Link;
  width?: number;
}

const baseLinkPreviewData: object = {};

export const LinkPreviewData = {
  fromJSON(object: any): LinkPreviewData {
    const message = { ...baseLinkPreviewData } as LinkPreviewData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
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
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
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
      message.link = Link.fromJSON(object.link);
    } else {
      message.link = undefined;
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
    message.link !== undefined && (obj.link = message.link ? Link.toJSON(message.link) : undefined);
    message.width !== undefined && (obj.width = message.width);
    return obj;
  },
};
