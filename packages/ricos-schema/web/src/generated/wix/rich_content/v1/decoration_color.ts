/* eslint-disable */
export interface ColorData {
  background?: string;
  foreground?: string;
}

const baseColorData: object = {};

export const ColorData = {
  fromJSON(object: any): ColorData {
    const message = { ...baseColorData } as ColorData;
    if (object.background !== undefined && object.background !== null) {
      message.background = String(object.background);
    } else {
      message.background = undefined;
    }
    if (object.foreground !== undefined && object.foreground !== null) {
      message.foreground = String(object.foreground);
    } else {
      message.foreground = undefined;
    }
    return message;
  },

  toJSON(message: ColorData): unknown {
    const obj: any = {};
    message.background !== undefined && (obj.background = message.background);
    message.foreground !== undefined && (obj.foreground = message.foreground);
    return obj;
  },
};
