/* eslint-disable */
import { TextStyle } from '../../../wix/rich_content/v1/common';

export interface CodeData {
  textStyle?: TextStyle;
}

const baseCodeData: object = {};

export const CodeData = {
  fromJSON(object: any): CodeData {
    const message = { ...baseCodeData } as CodeData;
    if (object.textStyle !== undefined && object.textStyle !== null) {
      message.textStyle = TextStyle.fromJSON(object.textStyle);
    } else {
      message.textStyle = undefined;
    }
    return message;
  },

  toJSON(message: CodeData): unknown {
    const obj: any = {};
    message.textStyle !== undefined &&
      (obj.textStyle = message.textStyle ? TextStyle.toJSON(message.textStyle) : undefined);
    return obj;
  },
};
