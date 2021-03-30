/* eslint-disable */
import { VideoMetadata } from './plugin_video';

export interface SoundCloudData {
  src: string;
  config?: SoundCloudConfig;
  metadata?: VideoMetadata;
}

export interface SoundCloudConfig {
  size?: string;
  alignment?: string;
  textWrap?: string;
}

const baseSoundCloudData: object = { src: '' };

export const SoundCloudData = {
  fromJSON(object: any): SoundCloudData {
    const message = { ...baseSoundCloudData } as SoundCloudData;
    if (object.src !== undefined && object.src !== null) {
      message.src = String(object.src);
    } else {
      message.src = '';
    }
    if (object.config !== undefined && object.config !== null) {
      message.config = SoundCloudConfig.fromJSON(object.config);
    } else {
      message.config = undefined;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = VideoMetadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },

  toJSON(message: SoundCloudData): unknown {
    const obj: any = {};
    message.src !== undefined && (obj.src = message.src);
    message.config !== undefined &&
      (obj.config = message.config ? SoundCloudConfig.toJSON(message.config) : undefined);
    message.metadata !== undefined &&
      (obj.metadata = message.metadata ? VideoMetadata.toJSON(message.metadata) : undefined);
    return obj;
  },
};

const baseSoundCloudConfig: object = {};

export const SoundCloudConfig = {
  fromJSON(object: any): SoundCloudConfig {
    const message = { ...baseSoundCloudConfig } as SoundCloudConfig;
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
    if (object.textWrap !== undefined && object.textWrap !== null) {
      message.textWrap = String(object.textWrap);
    } else {
      message.textWrap = undefined;
    }
    return message;
  },

  toJSON(message: SoundCloudConfig): unknown {
    const obj: any = {};
    message.size !== undefined && (obj.size = message.size);
    message.alignment !== undefined && (obj.alignment = message.alignment);
    message.textWrap !== undefined && (obj.textWrap = message.textWrap);
    return obj;
  },
};
