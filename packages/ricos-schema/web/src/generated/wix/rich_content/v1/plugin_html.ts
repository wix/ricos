/* eslint-disable */
import { PluginContainerData } from '../../../wix/rich_content/v1/common';

export interface HTMLData {
  containerData?: PluginContainerData;
  src: string;
  srcType?: string;
  config?: HTMLConfig;
}

export interface HTMLConfig {
  width?: number;
  height?: number;
  safe?: boolean;
}

const baseHTMLData: object = { src: '' };

export const HTMLData = {
  fromJSON(object: any): HTMLData {
    const message = { ...baseHTMLData } as HTMLData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.src !== undefined && object.src !== null) {
      message.src = String(object.src);
    } else {
      message.src = '';
    }
    if (object.srcType !== undefined && object.srcType !== null) {
      message.srcType = String(object.srcType);
    } else {
      message.srcType = undefined;
    }
    if (object.config !== undefined && object.config !== null) {
      message.config = HTMLConfig.fromJSON(object.config);
    } else {
      message.config = undefined;
    }
    return message;
  },

  toJSON(message: HTMLData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.src !== undefined && (obj.src = message.src);
    message.srcType !== undefined && (obj.srcType = message.srcType);
    message.config !== undefined &&
      (obj.config = message.config ? HTMLConfig.toJSON(message.config) : undefined);
    return obj;
  },
};

const baseHTMLConfig: object = {};

export const HTMLConfig = {
  fromJSON(object: any): HTMLConfig {
    const message = { ...baseHTMLConfig } as HTMLConfig;
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
    if (object.safe !== undefined && object.safe !== null) {
      message.safe = Boolean(object.safe);
    } else {
      message.safe = undefined;
    }
    return message;
  },

  toJSON(message: HTMLConfig): unknown {
    const obj: any = {};
    message.width !== undefined && (obj.width = message.width);
    message.height !== undefined && (obj.height = message.height);
    message.safe !== undefined && (obj.safe = message.safe);
    return obj;
  },
};
