/* eslint-disable */
import { TextStyle } from '../../rich_content/v1/common';

export interface ParagraphData {
  textStyle?: TextStyle;
  indentation?: number;
}

const baseParagraphData: object = {};

export const ParagraphData = {
  fromJSON(object: any): ParagraphData {
    const message = { ...baseParagraphData } as ParagraphData;
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

  toJSON(message: ParagraphData): unknown {
    const obj: any = {};
    message.textStyle !== undefined &&
      (obj.textStyle = message.textStyle ? TextStyle.toJSON(message.textStyle) : undefined);
    message.indentation !== undefined && (obj.indentation = message.indentation);
    return obj;
  },
};
