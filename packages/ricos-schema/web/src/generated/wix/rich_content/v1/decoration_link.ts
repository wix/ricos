/* eslint-disable */
export interface LinkData {
  url: string;
  rel?: string;
  target?: string;
  href?: string;
}

const baseLinkData: object = { url: '' };

export const LinkData = {
  fromJSON(object: any): LinkData {
    const message = { ...baseLinkData } as LinkData;
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = '';
    }
    if (object.rel !== undefined && object.rel !== null) {
      message.rel = String(object.rel);
    } else {
      message.rel = undefined;
    }
    if (object.target !== undefined && object.target !== null) {
      message.target = String(object.target);
    } else {
      message.target = undefined;
    }
    if (object.href !== undefined && object.href !== null) {
      message.href = String(object.href);
    } else {
      message.href = undefined;
    }
    return message;
  },

  toJSON(message: LinkData): unknown {
    const obj: any = {};
    message.url !== undefined && (obj.url = message.url);
    message.rel !== undefined && (obj.rel = message.rel);
    message.target !== undefined && (obj.target = message.target);
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};
