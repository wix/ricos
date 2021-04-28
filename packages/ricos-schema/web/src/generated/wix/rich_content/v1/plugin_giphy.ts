/* eslint-disable */
import { PluginContainerData } from '../../../wix/rich_content/v1/common';

export interface GiphyData {
  containerData?: PluginContainerData;
  gif?: GIFSource;
}

export interface GIFSource {
  height: number;
  width: number;
  originalUrl: string;
  stillUrl: string;
  originalMp4?: string;
  downsizedUrl?: string;
  downsizedStillUrl?: string;
  downsizedSmallMp4?: string;
}

const baseGiphyData: object = {};

export const GiphyData = {
  fromJSON(object: any): GiphyData {
    const message = { ...baseGiphyData } as GiphyData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.gif !== undefined && object.gif !== null) {
      message.gif = GIFSource.fromJSON(object.gif);
    } else {
      message.gif = undefined;
    }
    return message;
  },

  toJSON(message: GiphyData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.gif !== undefined &&
      (obj.gif = message.gif ? GIFSource.toJSON(message.gif) : undefined);
    return obj;
  },
};

const baseGIFSource: object = { height: 0, width: 0, originalUrl: '', stillUrl: '' };

export const GIFSource = {
  fromJSON(object: any): GIFSource {
    const message = { ...baseGIFSource } as GIFSource;
    if (object.height !== undefined && object.height !== null) {
      message.height = Number(object.height);
    } else {
      message.height = 0;
    }
    if (object.width !== undefined && object.width !== null) {
      message.width = Number(object.width);
    } else {
      message.width = 0;
    }
    if (object.originalUrl !== undefined && object.originalUrl !== null) {
      message.originalUrl = String(object.originalUrl);
    } else {
      message.originalUrl = '';
    }
    if (object.stillUrl !== undefined && object.stillUrl !== null) {
      message.stillUrl = String(object.stillUrl);
    } else {
      message.stillUrl = '';
    }
    if (object.originalMp4 !== undefined && object.originalMp4 !== null) {
      message.originalMp4 = String(object.originalMp4);
    } else {
      message.originalMp4 = undefined;
    }
    if (object.downsizedUrl !== undefined && object.downsizedUrl !== null) {
      message.downsizedUrl = String(object.downsizedUrl);
    } else {
      message.downsizedUrl = undefined;
    }
    if (object.downsizedStillUrl !== undefined && object.downsizedStillUrl !== null) {
      message.downsizedStillUrl = String(object.downsizedStillUrl);
    } else {
      message.downsizedStillUrl = undefined;
    }
    if (object.downsizedSmallMp4 !== undefined && object.downsizedSmallMp4 !== null) {
      message.downsizedSmallMp4 = String(object.downsizedSmallMp4);
    } else {
      message.downsizedSmallMp4 = undefined;
    }
    return message;
  },

  toJSON(message: GIFSource): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.width !== undefined && (obj.width = message.width);
    message.originalUrl !== undefined && (obj.originalUrl = message.originalUrl);
    message.stillUrl !== undefined && (obj.stillUrl = message.stillUrl);
    message.originalMp4 !== undefined && (obj.originalMp4 = message.originalMp4);
    message.downsizedUrl !== undefined && (obj.downsizedUrl = message.downsizedUrl);
    message.downsizedStillUrl !== undefined && (obj.downsizedStillUrl = message.downsizedStillUrl);
    message.downsizedSmallMp4 !== undefined && (obj.downsizedSmallMp4 = message.downsizedSmallMp4);
    return obj;
  },
};
