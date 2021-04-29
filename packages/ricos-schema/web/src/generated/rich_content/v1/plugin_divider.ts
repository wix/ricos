/* eslint-disable */
import { PluginContainerData } from '../../rich_content/v1/common';

export interface DividerData {
  containerData?: PluginContainerData;
  type: DividerData_Type;
  width: DividerData_Width;
  alignment: DividerData_Alignment;
}

export const enum DividerData_Type {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
  DASHED = 'DASHED',
  DOTTED = 'DOTTED',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function dividerData_TypeFromJSON(object: any): DividerData_Type {
  switch (object) {
    case 0:
    case 'SINGLE':
      return DividerData_Type.SINGLE;
    case 1:
    case 'DOUBLE':
      return DividerData_Type.DOUBLE;
    case 2:
    case 'DASHED':
      return DividerData_Type.DASHED;
    case 3:
    case 'DOTTED':
      return DividerData_Type.DOTTED;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return DividerData_Type.UNRECOGNIZED;
  }
}

export function dividerData_TypeToJSON(object: DividerData_Type): string {
  switch (object) {
    case DividerData_Type.SINGLE:
      return 'SINGLE';
    case DividerData_Type.DOUBLE:
      return 'DOUBLE';
    case DividerData_Type.DASHED:
      return 'DASHED';
    case DividerData_Type.DOTTED:
      return 'DOTTED';
    default:
      return 'UNKNOWN';
  }
}

export const enum DividerData_Width {
  LARGE = 'LARGE',
  MEDIUM = 'MEDIUM',
  SMALL = 'SMALL',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function dividerData_WidthFromJSON(object: any): DividerData_Width {
  switch (object) {
    case 0:
    case 'LARGE':
      return DividerData_Width.LARGE;
    case 1:
    case 'MEDIUM':
      return DividerData_Width.MEDIUM;
    case 2:
    case 'SMALL':
      return DividerData_Width.SMALL;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return DividerData_Width.UNRECOGNIZED;
  }
}

export function dividerData_WidthToJSON(object: DividerData_Width): string {
  switch (object) {
    case DividerData_Width.LARGE:
      return 'LARGE';
    case DividerData_Width.MEDIUM:
      return 'MEDIUM';
    case DividerData_Width.SMALL:
      return 'SMALL';
    default:
      return 'UNKNOWN';
  }
}

export const enum DividerData_Alignment {
  CENTER = 'CENTER',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function dividerData_AlignmentFromJSON(object: any): DividerData_Alignment {
  switch (object) {
    case 0:
    case 'CENTER':
      return DividerData_Alignment.CENTER;
    case 1:
    case 'LEFT':
      return DividerData_Alignment.LEFT;
    case 2:
    case 'RIGHT':
      return DividerData_Alignment.RIGHT;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return DividerData_Alignment.UNRECOGNIZED;
  }
}

export function dividerData_AlignmentToJSON(object: DividerData_Alignment): string {
  switch (object) {
    case DividerData_Alignment.CENTER:
      return 'CENTER';
    case DividerData_Alignment.LEFT:
      return 'LEFT';
    case DividerData_Alignment.RIGHT:
      return 'RIGHT';
    default:
      return 'UNKNOWN';
  }
}

const baseDividerData: object = {
  type: DividerData_Type.SINGLE,
  width: DividerData_Width.LARGE,
  alignment: DividerData_Alignment.CENTER,
};

export const DividerData = {
  fromJSON(object: any): DividerData {
    const message = { ...baseDividerData } as DividerData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = dividerData_TypeFromJSON(object.type);
    } else {
      message.type = DividerData_Type.SINGLE;
    }
    if (object.width !== undefined && object.width !== null) {
      message.width = dividerData_WidthFromJSON(object.width);
    } else {
      message.width = DividerData_Width.LARGE;
    }
    if (object.alignment !== undefined && object.alignment !== null) {
      message.alignment = dividerData_AlignmentFromJSON(object.alignment);
    } else {
      message.alignment = DividerData_Alignment.CENTER;
    }
    return message;
  },

  toJSON(message: DividerData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.type !== undefined && (obj.type = dividerData_TypeToJSON(message.type));
    message.width !== undefined && (obj.width = dividerData_WidthToJSON(message.width));
    message.alignment !== undefined &&
      (obj.alignment = dividerData_AlignmentToJSON(message.alignment));
    return obj;
  },
};
