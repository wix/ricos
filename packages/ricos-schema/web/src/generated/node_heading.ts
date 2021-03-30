/* eslint-disable */
import {
  Common_TextAlignment,
  Common_DynamicStyles,
  common_TextAlignmentFromJSON,
  common_TextAlignmentToJSON,
} from './common';

export interface HeadingData {
  level: number;
  textAlignment: Common_TextAlignment;
  dynamicStyles?: Common_DynamicStyles;
  depth?: number;
}

const baseHeadingData: object = { level: 0, textAlignment: Common_TextAlignment.LEFT };

export const HeadingData = {
  fromJSON(object: any): HeadingData {
    const message = { ...baseHeadingData } as HeadingData;
    if (object.level !== undefined && object.level !== null) {
      message.level = Number(object.level);
    } else {
      message.level = 0;
    }
    if (object.textAlignment !== undefined && object.textAlignment !== null) {
      message.textAlignment = common_TextAlignmentFromJSON(object.textAlignment);
    } else {
      message.textAlignment = Common_TextAlignment.LEFT;
    }
    if (object.dynamicStyles !== undefined && object.dynamicStyles !== null) {
      message.dynamicStyles = Common_DynamicStyles.fromJSON(object.dynamicStyles);
    } else {
      message.dynamicStyles = undefined;
    }
    if (object.depth !== undefined && object.depth !== null) {
      message.depth = Number(object.depth);
    } else {
      message.depth = undefined;
    }
    return message;
  },

  toJSON(message: HeadingData): unknown {
    const obj: any = {};
    message.level !== undefined && (obj.level = message.level);
    message.textAlignment !== undefined &&
      (obj.textAlignment = common_TextAlignmentToJSON(message.textAlignment));
    message.dynamicStyles !== undefined &&
      (obj.dynamicStyles = message.dynamicStyles
        ? Common_DynamicStyles.toJSON(message.dynamicStyles)
        : undefined);
    message.depth !== undefined && (obj.depth = message.depth);
    return obj;
  },
};
