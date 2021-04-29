/* eslint-disable */
import { PluginContainerData, Link } from '../../rich_content/v1/common';

export interface ButtonData {
  containerData?: PluginContainerData;
  type: ButtonData_Type;
  styles?: ButtonData_ButtonStyles;
  text?: string;
  link?: Link;
}

export const enum ButtonData_Type {
  LINK = 'LINK',
  ACTION = 'ACTION',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function buttonData_TypeFromJSON(object: any): ButtonData_Type {
  switch (object) {
    case 0:
    case 'LINK':
      return ButtonData_Type.LINK;
    case 1:
    case 'ACTION':
      return ButtonData_Type.ACTION;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return ButtonData_Type.UNRECOGNIZED;
  }
}

export function buttonData_TypeToJSON(object: ButtonData_Type): string {
  switch (object) {
    case ButtonData_Type.LINK:
      return 'LINK';
    case ButtonData_Type.ACTION:
      return 'ACTION';
    default:
      return 'UNKNOWN';
  }
}

export interface ButtonData_ButtonStyles {
  /** number of pixels */
  borderWidth?: number;
  /** number of pixels */
  borderRadius?: number;
  /** hex color */
  textColor?: string;
  /** hex color */
  borderColor?: string;
  /** hex color */
  backgroundColor?: string;
}

const baseButtonData: object = { type: ButtonData_Type.LINK };

export const ButtonData = {
  fromJSON(object: any): ButtonData {
    const message = { ...baseButtonData } as ButtonData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = buttonData_TypeFromJSON(object.type);
    } else {
      message.type = ButtonData_Type.LINK;
    }
    if (object.styles !== undefined && object.styles !== null) {
      message.styles = ButtonData_ButtonStyles.fromJSON(object.styles);
    } else {
      message.styles = undefined;
    }
    if (object.text !== undefined && object.text !== null) {
      message.text = String(object.text);
    } else {
      message.text = undefined;
    }
    if (object.link !== undefined && object.link !== null) {
      message.link = Link.fromJSON(object.link);
    } else {
      message.link = undefined;
    }
    return message;
  },

  toJSON(message: ButtonData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.type !== undefined && (obj.type = buttonData_TypeToJSON(message.type));
    message.styles !== undefined &&
      (obj.styles = message.styles ? ButtonData_ButtonStyles.toJSON(message.styles) : undefined);
    message.text !== undefined && (obj.text = message.text);
    message.link !== undefined && (obj.link = message.link ? Link.toJSON(message.link) : undefined);
    return obj;
  },
};

const baseButtonData_ButtonStyles: object = {};

export const ButtonData_ButtonStyles = {
  fromJSON(object: any): ButtonData_ButtonStyles {
    const message = { ...baseButtonData_ButtonStyles } as ButtonData_ButtonStyles;
    if (object.borderWidth !== undefined && object.borderWidth !== null) {
      message.borderWidth = Number(object.borderWidth);
    } else {
      message.borderWidth = undefined;
    }
    if (object.borderRadius !== undefined && object.borderRadius !== null) {
      message.borderRadius = Number(object.borderRadius);
    } else {
      message.borderRadius = undefined;
    }
    if (object.textColor !== undefined && object.textColor !== null) {
      message.textColor = String(object.textColor);
    } else {
      message.textColor = undefined;
    }
    if (object.borderColor !== undefined && object.borderColor !== null) {
      message.borderColor = String(object.borderColor);
    } else {
      message.borderColor = undefined;
    }
    if (object.backgroundColor !== undefined && object.backgroundColor !== null) {
      message.backgroundColor = String(object.backgroundColor);
    } else {
      message.backgroundColor = undefined;
    }
    return message;
  },

  toJSON(message: ButtonData_ButtonStyles): unknown {
    const obj: any = {};
    message.borderWidth !== undefined && (obj.borderWidth = message.borderWidth);
    message.borderRadius !== undefined && (obj.borderRadius = message.borderRadius);
    message.textColor !== undefined && (obj.textColor = message.textColor);
    message.borderColor !== undefined && (obj.borderColor = message.borderColor);
    message.backgroundColor !== undefined && (obj.backgroundColor = message.backgroundColor);
    return obj;
  },
};
