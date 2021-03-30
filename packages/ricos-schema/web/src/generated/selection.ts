/* eslint-disable */
export interface Selection {
  /** Selection start node key */
  anchorNode: string;
  /** Selection start offset */
  anchorOffset?: number;
  /** Selection end node key */
  focusNode?: string;
  /** Selection end offset */
  focusOffset?: number;
}

const baseSelection: object = { anchorNode: '' };

export const Selection = {
  fromJSON(object: any): Selection {
    const message = { ...baseSelection } as Selection;
    if (object.anchorNode !== undefined && object.anchorNode !== null) {
      message.anchorNode = String(object.anchorNode);
    } else {
      message.anchorNode = '';
    }
    if (object.anchorOffset !== undefined && object.anchorOffset !== null) {
      message.anchorOffset = Number(object.anchorOffset);
    } else {
      message.anchorOffset = undefined;
    }
    if (object.focusNode !== undefined && object.focusNode !== null) {
      message.focusNode = String(object.focusNode);
    } else {
      message.focusNode = undefined;
    }
    if (object.focusOffset !== undefined && object.focusOffset !== null) {
      message.focusOffset = Number(object.focusOffset);
    } else {
      message.focusOffset = undefined;
    }
    return message;
  },

  toJSON(message: Selection): unknown {
    const obj: any = {};
    message.anchorNode !== undefined && (obj.anchorNode = message.anchorNode);
    message.anchorOffset !== undefined && (obj.anchorOffset = message.anchorOffset);
    message.focusNode !== undefined && (obj.focusNode = message.focusNode);
    message.focusOffset !== undefined && (obj.focusOffset = message.focusOffset);
    return obj;
  },
};
