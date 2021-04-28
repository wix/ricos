/* eslint-disable */
import { TextStyle } from '../../../wix/rich_content/v1/common';

export interface HeadingData {
  level: number;
  textStyle?: TextStyle;
  indentation?: number;
}

const baseHeadingData: object = { level: 0 };

export const HeadingData = {
  fromJSON(object: any): HeadingData {
    const message = { ...baseHeadingData } as HeadingData;
    if (object.level !== undefined && object.level !== null) {
      message.level = Number(object.level);
    } else {
      message.level = 0;
    }
    if (object.textStyle !== undefined && object.textStyle !== null) {
      message.textStyle = TextStyle.fromJSON(object.textStyle);
    } else {
      message.textStyle = undefined;
    }
    if (object.indentation !== undefined && object.indentation !== null) {
      message.indentation = Number(object.indentation);
    } else {
      message.indentation = undefined;
    }
    return message;
  },

  toJSON(message: HeadingData): unknown {
    const obj: any = {};
    message.level !== undefined && (obj.level = message.level);
    message.textStyle !== undefined &&
      (obj.textStyle = message.textStyle ? TextStyle.toJSON(message.textStyle) : undefined);
    message.indentation !== undefined && (obj.indentation = message.indentation);
    return obj;
  },
};
