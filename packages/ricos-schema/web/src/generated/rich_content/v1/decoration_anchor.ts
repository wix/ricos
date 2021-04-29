/* eslint-disable */
export interface AnchorData {
  anchor: string;
}

const baseAnchorData: object = { anchor: '' };

export const AnchorData = {
  fromJSON(object: any): AnchorData {
    const message = { ...baseAnchorData } as AnchorData;
    if (object.anchor !== undefined && object.anchor !== null) {
      message.anchor = String(object.anchor);
    } else {
      message.anchor = '';
    }
    return message;
  },

  toJSON(message: AnchorData): unknown {
    const obj: any = {};
    message.anchor !== undefined && (obj.anchor = message.anchor);
    return obj;
  },
};
