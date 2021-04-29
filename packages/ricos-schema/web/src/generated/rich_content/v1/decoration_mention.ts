/* eslint-disable */
export interface MentionData {
  name: string;
  slug: string;
}

const baseMentionData: object = { name: '', slug: '' };

export const MentionData = {
  fromJSON(object: any): MentionData {
    const message = { ...baseMentionData } as MentionData;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = '';
    }
    if (object.slug !== undefined && object.slug !== null) {
      message.slug = String(object.slug);
    } else {
      message.slug = '';
    }
    return message;
  },

  toJSON(message: MentionData): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.slug !== undefined && (obj.slug = message.slug);
    return obj;
  },
};
