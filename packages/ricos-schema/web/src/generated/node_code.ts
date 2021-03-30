/* eslint-disable */
import {
  Common_TextAlignment,
  Common_DynamicStyles,
  common_TextAlignmentFromJSON,
  common_TextAlignmentToJSON,
} from './common';

export interface CodeData {
  textAlignment: Common_TextAlignment;
  dynamicStyles?: Common_DynamicStyles;
}

const baseCodeData: object = { textAlignment: Common_TextAlignment.LEFT };

export const CodeData = {
  fromJSON(object: any): CodeData {
    const message = { ...baseCodeData } as CodeData;
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
    return message;
  },

  toJSON(message: CodeData): unknown {
    const obj: any = {};
    message.textAlignment !== undefined &&
      (obj.textAlignment = common_TextAlignmentToJSON(message.textAlignment));
    message.dynamicStyles !== undefined &&
      (obj.dynamicStyles = message.dynamicStyles
        ? Common_DynamicStyles.toJSON(message.dynamicStyles)
        : undefined);
    return obj;
  },
};
