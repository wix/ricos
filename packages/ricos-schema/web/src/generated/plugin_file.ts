/* eslint-disable */
export interface FileData {
  config?: FileConfig;
  name?: string;
  type?: string;
  url?: string;
  id?: string;
  size?: number;
}

export interface FileConfig {
  size?: string;
  alignment?: string;
  width?: string;
}

const baseFileData: object = {};

export const FileData = {
  fromJSON(object: any): FileData {
    const message = { ...baseFileData } as FileData;
    if (object.config !== undefined && object.config !== null) {
      message.config = FileConfig.fromJSON(object.config);
    } else {
      message.config = undefined;
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
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = undefined;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = undefined;
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
    message.config !== undefined &&
      (obj.config = message.config ? FileConfig.toJSON(message.config) : undefined);
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined && (obj.type = message.type);
    message.url !== undefined && (obj.url = message.url);
    message.id !== undefined && (obj.id = message.id);
    message.size !== undefined && (obj.size = message.size);
    return obj;
  },
};

const baseFileConfig: object = {};

export const FileConfig = {
  fromJSON(object: any): FileConfig {
    const message = { ...baseFileConfig } as FileConfig;
    if (object.size !== undefined && object.size !== null) {
      message.size = String(object.size);
    } else {
      message.size = undefined;
    }
    if (object.alignment !== undefined && object.alignment !== null) {
      message.alignment = String(object.alignment);
    } else {
      message.alignment = undefined;
    }
    if (object.width !== undefined && object.width !== null) {
      message.width = String(object.width);
    } else {
      message.width = undefined;
    }
    return message;
  },

  toJSON(message: FileConfig): unknown {
    const obj: any = {};
    message.size !== undefined && (obj.size = message.size);
    message.alignment !== undefined && (obj.alignment = message.alignment);
    message.width !== undefined && (obj.width = message.width);
    return obj;
  },
};
