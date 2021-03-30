/* eslint-disable */
export interface Common {}

export const enum Common_TextAlignment {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  CENTER = 'CENTER',
  JUSTIFY = 'JUSTIFY',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function common_TextAlignmentFromJSON(object: any): Common_TextAlignment {
  switch (object) {
    case 0:
    case 'LEFT':
      return Common_TextAlignment.LEFT;
    case 1:
    case 'RIGHT':
      return Common_TextAlignment.RIGHT;
    case 2:
    case 'CENTER':
      return Common_TextAlignment.CENTER;
    case 3:
    case 'JUSTIFY':
      return Common_TextAlignment.JUSTIFY;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return Common_TextAlignment.UNRECOGNIZED;
  }
}

export function common_TextAlignmentToJSON(object: Common_TextAlignment): string {
  switch (object) {
    case Common_TextAlignment.LEFT:
      return 'LEFT';
    case Common_TextAlignment.RIGHT:
      return 'RIGHT';
    case Common_TextAlignment.CENTER:
      return 'CENTER';
    case Common_TextAlignment.JUSTIFY:
      return 'JUSTIFY';
    default:
      return 'UNKNOWN';
  }
}

export interface Common_DynamicStyles {
  lineHeight?: string;
  paddingTop?: string;
  paddingBottom?: string;
}

export interface Spoiler {
  enabled?: boolean;
  description?: string;
  buttonContent?: string;
}

const baseCommon: object = {};

export const Common = {
  fromJSON(_: any): Common {
    const message = { ...baseCommon } as Common;
    return message;
  },

  toJSON(_: Common): unknown {
    const obj: any = {};
    return obj;
  },
};

const baseCommon_DynamicStyles: object = {};

export const Common_DynamicStyles = {
  fromJSON(object: any): Common_DynamicStyles {
    const message = { ...baseCommon_DynamicStyles } as Common_DynamicStyles;
    if (object.lineHeight !== undefined && object.lineHeight !== null) {
      message.lineHeight = String(object.lineHeight);
    } else {
      message.lineHeight = undefined;
    }
    if (object.paddingTop !== undefined && object.paddingTop !== null) {
      message.paddingTop = String(object.paddingTop);
    } else {
      message.paddingTop = undefined;
    }
    if (object.paddingBottom !== undefined && object.paddingBottom !== null) {
      message.paddingBottom = String(object.paddingBottom);
    } else {
      message.paddingBottom = undefined;
    }
    return message;
  },

  toJSON(message: Common_DynamicStyles): unknown {
    const obj: any = {};
    message.lineHeight !== undefined && (obj.lineHeight = message.lineHeight);
    message.paddingTop !== undefined && (obj.paddingTop = message.paddingTop);
    message.paddingBottom !== undefined && (obj.paddingBottom = message.paddingBottom);
    return obj;
  },
};

const baseSpoiler: object = {};

export const Spoiler = {
  fromJSON(object: any): Spoiler {
    const message = { ...baseSpoiler } as Spoiler;
    if (object.enabled !== undefined && object.enabled !== null) {
      message.enabled = Boolean(object.enabled);
    } else {
      message.enabled = undefined;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = undefined;
    }
    if (object.buttonContent !== undefined && object.buttonContent !== null) {
      message.buttonContent = String(object.buttonContent);
    } else {
      message.buttonContent = undefined;
    }
    return message;
  },

  toJSON(message: Spoiler): unknown {
    const obj: any = {};
    message.enabled !== undefined && (obj.enabled = message.enabled);
    message.description !== undefined && (obj.description = message.description);
    message.buttonContent !== undefined && (obj.buttonContent = message.buttonContent);
    return obj;
  },
};
