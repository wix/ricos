/* eslint-disable */
export interface DividerData {
  type: DividerData_DividerType;
  config?: DividerConfig;
}

export const enum DividerData_DividerType {
  DOUBLE = 'DOUBLE',
  SINGLE = 'SINGLE',
  DASHED = 'DASHED',
  DOTTED = 'DOTTED',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function dividerData_DividerTypeFromJSON(object: any): DividerData_DividerType {
  switch (object) {
    case 0:
    case 'DOUBLE':
      return DividerData_DividerType.DOUBLE;
    case 1:
    case 'SINGLE':
      return DividerData_DividerType.SINGLE;
    case 2:
    case 'DASHED':
      return DividerData_DividerType.DASHED;
    case 3:
    case 'DOTTED':
      return DividerData_DividerType.DOTTED;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return DividerData_DividerType.UNRECOGNIZED;
  }
}

export function dividerData_DividerTypeToJSON(object: DividerData_DividerType): string {
  switch (object) {
    case DividerData_DividerType.DOUBLE:
      return 'DOUBLE';
    case DividerData_DividerType.SINGLE:
      return 'SINGLE';
    case DividerData_DividerType.DASHED:
      return 'DASHED';
    case DividerData_DividerType.DOTTED:
      return 'DOTTED';
    default:
      return 'UNKNOWN';
  }
}

export interface DividerConfig {
  size: DividerConfig_DividerSize;
  alignment: DividerConfig_DividerAlignment;
  textWrap?: string;
}

export const enum DividerConfig_DividerSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function dividerConfig_DividerSizeFromJSON(object: any): DividerConfig_DividerSize {
  switch (object) {
    case 0:
    case 'SMALL':
      return DividerConfig_DividerSize.SMALL;
    case 1:
    case 'MEDIUM':
      return DividerConfig_DividerSize.MEDIUM;
    case 2:
    case 'LARGE':
      return DividerConfig_DividerSize.LARGE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return DividerConfig_DividerSize.UNRECOGNIZED;
  }
}

export function dividerConfig_DividerSizeToJSON(object: DividerConfig_DividerSize): string {
  switch (object) {
    case DividerConfig_DividerSize.SMALL:
      return 'SMALL';
    case DividerConfig_DividerSize.MEDIUM:
      return 'MEDIUM';
    case DividerConfig_DividerSize.LARGE:
      return 'LARGE';
    default:
      return 'UNKNOWN';
  }
}

export const enum DividerConfig_DividerAlignment {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  CENTER = 'CENTER',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function dividerConfig_DividerAlignmentFromJSON(
  object: any
): DividerConfig_DividerAlignment {
  switch (object) {
    case 0:
    case 'LEFT':
      return DividerConfig_DividerAlignment.LEFT;
    case 1:
    case 'RIGHT':
      return DividerConfig_DividerAlignment.RIGHT;
    case 2:
    case 'CENTER':
      return DividerConfig_DividerAlignment.CENTER;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return DividerConfig_DividerAlignment.UNRECOGNIZED;
  }
}

export function dividerConfig_DividerAlignmentToJSON(
  object: DividerConfig_DividerAlignment
): string {
  switch (object) {
    case DividerConfig_DividerAlignment.LEFT:
      return 'LEFT';
    case DividerConfig_DividerAlignment.RIGHT:
      return 'RIGHT';
    case DividerConfig_DividerAlignment.CENTER:
      return 'CENTER';
    default:
      return 'UNKNOWN';
  }
}

const baseDividerData: object = { type: DividerData_DividerType.DOUBLE };

export const DividerData = {
  fromJSON(object: any): DividerData {
    const message = { ...baseDividerData } as DividerData;
    if (object.type !== undefined && object.type !== null) {
      message.type = dividerData_DividerTypeFromJSON(object.type);
    } else {
      message.type = DividerData_DividerType.DOUBLE;
    }
    if (object.config !== undefined && object.config !== null) {
      message.config = DividerConfig.fromJSON(object.config);
    } else {
      message.config = undefined;
    }
    return message;
  },

  toJSON(message: DividerData): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = dividerData_DividerTypeToJSON(message.type));
    message.config !== undefined &&
      (obj.config = message.config ? DividerConfig.toJSON(message.config) : undefined);
    return obj;
  },
};

const baseDividerConfig: object = {
  size: DividerConfig_DividerSize.SMALL,
  alignment: DividerConfig_DividerAlignment.LEFT,
};

export const DividerConfig = {
  fromJSON(object: any): DividerConfig {
    const message = { ...baseDividerConfig } as DividerConfig;
    if (object.size !== undefined && object.size !== null) {
      message.size = dividerConfig_DividerSizeFromJSON(object.size);
    } else {
      message.size = DividerConfig_DividerSize.SMALL;
    }
    if (object.alignment !== undefined && object.alignment !== null) {
      message.alignment = dividerConfig_DividerAlignmentFromJSON(object.alignment);
    } else {
      message.alignment = DividerConfig_DividerAlignment.LEFT;
    }
    if (object.textWrap !== undefined && object.textWrap !== null) {
      message.textWrap = String(object.textWrap);
    } else {
      message.textWrap = undefined;
    }
    return message;
  },

  toJSON(message: DividerConfig): unknown {
    const obj: any = {};
    message.size !== undefined && (obj.size = dividerConfig_DividerSizeToJSON(message.size));
    message.alignment !== undefined &&
      (obj.alignment = dividerConfig_DividerAlignmentToJSON(message.alignment));
    message.textWrap !== undefined && (obj.textWrap = message.textWrap);
    return obj;
  },
};
