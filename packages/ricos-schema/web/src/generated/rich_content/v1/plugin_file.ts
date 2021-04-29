/* eslint-disable */
import { PluginContainerData, FileSource } from '../../rich_content/v1/common';

export interface FileData {
  containerData?: PluginContainerData;
  src?: FileSource;
  name?: string;
  type?: string;
  size?: number;
}

const baseFileData: object = {};

export const FileData = {
  fromJSON(object: any): FileData {
    const message = { ...baseFileData } as FileData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.src !== undefined && object.src !== null) {
      message.src = FileSource.fromJSON(object.src);
    } else {
      message.src = undefined;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = undefined;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = undefined;
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = Number(object.size);
    } else {
      message.size = undefined;
    }
    return message;
  },

  toJSON(message: FileData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.src !== undefined &&
      (obj.src = message.src ? FileSource.toJSON(message.src) : undefined);
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined && (obj.type = message.type);
    message.size !== undefined && (obj.size = message.size);
    return obj;
  },
};
