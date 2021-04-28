/* eslint-disable */
import { PluginContainerData, Media } from '../../../wix/rich_content/v1/common';

export interface VideoData {
  containerData?: PluginContainerData;
  video?: Media;
  thumbnail?: Media;
}

const baseVideoData: object = {};

export const VideoData = {
  fromJSON(object: any): VideoData {
    const message = { ...baseVideoData } as VideoData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.video !== undefined && object.video !== null) {
      message.video = Media.fromJSON(object.video);
    } else {
      message.video = undefined;
    }
    if (object.thumbnail !== undefined && object.thumbnail !== null) {
      message.thumbnail = Media.fromJSON(object.thumbnail);
    } else {
      message.thumbnail = undefined;
    }
    return message;
  },

  toJSON(message: VideoData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.video !== undefined &&
      (obj.video = message.video ? Media.toJSON(message.video) : undefined);
    message.thumbnail !== undefined &&
      (obj.thumbnail = message.thumbnail ? Media.toJSON(message.thumbnail) : undefined);
    return obj;
  },
};
