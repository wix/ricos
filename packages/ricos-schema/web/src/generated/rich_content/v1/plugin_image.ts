/* eslint-disable */
import { PluginContainerData, Media, Link } from '../../rich_content/v1/common';

export interface ImageData {
  containerData?: PluginContainerData;
  image?: Media;
  link?: Link;
  disableExpand?: boolean;
  altText?: string;
  caption?: string;
}

const baseImageData: object = {};

export const ImageData = {
  fromJSON(object: any): ImageData {
    const message = { ...baseImageData } as ImageData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.image !== undefined && object.image !== null) {
      message.image = Media.fromJSON(object.image);
    } else {
      message.image = undefined;
    }
    if (object.link !== undefined && object.link !== null) {
      message.link = Link.fromJSON(object.link);
    } else {
      message.link = undefined;
    }
    if (object.disableExpand !== undefined && object.disableExpand !== null) {
      message.disableExpand = Boolean(object.disableExpand);
    } else {
      message.disableExpand = undefined;
    }
    if (object.altText !== undefined && object.altText !== null) {
      message.altText = String(object.altText);
    } else {
      message.altText = undefined;
    }
    if (object.caption !== undefined && object.caption !== null) {
      message.caption = String(object.caption);
    } else {
      message.caption = undefined;
    }
    return message;
  },

  toJSON(message: ImageData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.image !== undefined &&
      (obj.image = message.image ? Media.toJSON(message.image) : undefined);
    message.link !== undefined && (obj.link = message.link ? Link.toJSON(message.link) : undefined);
    message.disableExpand !== undefined && (obj.disableExpand = message.disableExpand);
    message.altText !== undefined && (obj.altText = message.altText);
    message.caption !== undefined && (obj.caption = message.caption);
    return obj;
  },
};
