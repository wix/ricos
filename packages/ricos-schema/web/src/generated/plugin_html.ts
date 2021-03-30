/* eslint-disable */
export interface HTMLData {
  src: string;
  srcType?: string;
  config?: HTMLConfig;
}

export interface HTMLConfig {
  width?: number;
  height?: number;
  alignment: HTMLConfig_HTMLAlignment;
  safe?: boolean;
}

export const enum HTMLConfig_HTMLAlignment {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  CENTER = 'CENTER',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function hTMLConfig_HTMLAlignmentFromJSON(object: any): HTMLConfig_HTMLAlignment {
  switch (object) {
    case 0:
    case 'LEFT':
      return HTMLConfig_HTMLAlignment.LEFT;
    case 1:
    case 'RIGHT':
      return HTMLConfig_HTMLAlignment.RIGHT;
    case 2:
    case 'CENTER':
      return HTMLConfig_HTMLAlignment.CENTER;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return HTMLConfig_HTMLAlignment.UNRECOGNIZED;
  }
}

export function hTMLConfig_HTMLAlignmentToJSON(object: HTMLConfig_HTMLAlignment): string {
  switch (object) {
    case HTMLConfig_HTMLAlignment.LEFT:
      return 'LEFT';
    case HTMLConfig_HTMLAlignment.RIGHT:
      return 'RIGHT';
    case HTMLConfig_HTMLAlignment.CENTER:
      return 'CENTER';
    default:
      return 'UNKNOWN';
  }
}

const baseHTMLData: object = { src: '' };

export const HTMLData = {
  fromJSON(object: any): HTMLData {
    const message = { ...baseHTMLData } as HTMLData;
    if (object.src !== undefined && object.src !== null) {
      message.src = String(object.src);
    } else {
      message.src = '';
    }
    if (object.srcType !== undefined && object.srcType !== null) {
      message.srcType = String(object.srcType);
    } else {
      message.srcType = undefined;
    }
    if (object.config !== undefined && object.config !== null) {
      message.config = HTMLConfig.fromJSON(object.config);
    } else {
      message.config = undefined;
    }
    return message;
  },

  toJSON(message: HTMLData): unknown {
    const obj: any = {};
    message.src !== undefined && (obj.src = message.src);
    message.srcType !== undefined && (obj.srcType = message.srcType);
    message.config !== undefined &&
      (obj.config = message.config ? HTMLConfig.toJSON(message.config) : undefined);
    return obj;
  },
};

const baseHTMLConfig: object = { alignment: HTMLConfig_HTMLAlignment.LEFT };

export const HTMLConfig = {
  fromJSON(object: any): HTMLConfig {
    const message = { ...baseHTMLConfig } as HTMLConfig;
    if (object.width !== undefined && object.width !== null) {
      message.width = Number(object.width);
    } else {
      message.width = undefined;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Number(object.height);
    } else {
      message.height = undefined;
    }
    if (object.alignment !== undefined && object.alignment !== null) {
      message.alignment = hTMLConfig_HTMLAlignmentFromJSON(object.alignment);
    } else {
      message.alignment = HTMLConfig_HTMLAlignment.LEFT;
    }
    if (object.safe !== undefined && object.safe !== null) {
      message.safe = Boolean(object.safe);
    } else {
      message.safe = undefined;
    }
    return message;
  },

  toJSON(message: HTMLConfig): unknown {
    const obj: any = {};
    message.width !== undefined && (obj.width = message.width);
    message.height !== undefined && (obj.height = message.height);
    message.alignment !== undefined &&
      (obj.alignment = hTMLConfig_HTMLAlignmentToJSON(message.alignment));
    message.safe !== undefined && (obj.safe = message.safe);
    return obj;
  },
};
