/* eslint-disable */
export interface ButtonData {
  button?: Button;
  config?: ButtonConfig;
}

export interface Button {
  url: string;
  target: boolean;
  rel: boolean;
  textColor?: string;
  pickerType?: string;
  borderRadius?: number;
  borderWidth?: number;
  buttonSize?: string;
  buttonText?: string;
  buttonTheme?: number;
  backgroundColor?: string;
  borderColor?: string;
}

export interface ButtonConfig {
  width?: string;
  alignment?: string;
}

const baseButtonData: object = {};

export const ButtonData = {
  fromJSON(object: any): ButtonData {
    const message = { ...baseButtonData } as ButtonData;
    if (object.button !== undefined && object.button !== null) {
      message.button = Button.fromJSON(object.button);
    } else {
      message.button = undefined;
    }
    if (object.config !== undefined && object.config !== null) {
      message.config = ButtonConfig.fromJSON(object.config);
    } else {
      message.config = undefined;
    }
    return message;
  },

  toJSON(message: ButtonData): unknown {
    const obj: any = {};
    message.button !== undefined &&
      (obj.button = message.button ? Button.toJSON(message.button) : undefined);
    message.config !== undefined &&
      (obj.config = message.config ? ButtonConfig.toJSON(message.config) : undefined);
    return obj;
  },
};

const baseButton: object = { url: '', target: false, rel: false };

export const Button = {
  fromJSON(object: any): Button {
    const message = { ...baseButton } as Button;
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = '';
    }
    if (object.target !== undefined && object.target !== null) {
      message.target = Boolean(object.target);
    } else {
      message.target = false;
    }
    if (object.rel !== undefined && object.rel !== null) {
      message.rel = Boolean(object.rel);
    } else {
      message.rel = false;
    }
    if (object.textColor !== undefined && object.textColor !== null) {
      message.textColor = String(object.textColor);
    } else {
      message.textColor = undefined;
    }
    if (object.pickerType !== undefined && object.pickerType !== null) {
      message.pickerType = String(object.pickerType);
    } else {
      message.pickerType = undefined;
    }
    if (object.borderRadius !== undefined && object.borderRadius !== null) {
      message.borderRadius = Number(object.borderRadius);
    } else {
      message.borderRadius = undefined;
    }
    if (object.borderWidth !== undefined && object.borderWidth !== null) {
      message.borderWidth = Number(object.borderWidth);
    } else {
      message.borderWidth = undefined;
    }
    if (object.buttonSize !== undefined && object.buttonSize !== null) {
      message.buttonSize = String(object.buttonSize);
    } else {
      message.buttonSize = undefined;
    }
    if (object.buttonText !== undefined && object.buttonText !== null) {
      message.buttonText = String(object.buttonText);
    } else {
      message.buttonText = undefined;
    }
    if (object.buttonTheme !== undefined && object.buttonTheme !== null) {
      message.buttonTheme = Number(object.buttonTheme);
    } else {
      message.buttonTheme = undefined;
    }
    if (object.backgroundColor !== undefined && object.backgroundColor !== null) {
      message.backgroundColor = String(object.backgroundColor);
    } else {
      message.backgroundColor = undefined;
    }
    if (object.borderColor !== undefined && object.borderColor !== null) {
      message.borderColor = String(object.borderColor);
    } else {
      message.borderColor = undefined;
    }
    return message;
  },

  toJSON(message: Button): unknown {
    const obj: any = {};
    message.url !== undefined && (obj.url = message.url);
    message.target !== undefined && (obj.target = message.target);
    message.rel !== undefined && (obj.rel = message.rel);
    message.textColor !== undefined && (obj.textColor = message.textColor);
    message.pickerType !== undefined && (obj.pickerType = message.pickerType);
    message.borderRadius !== undefined && (obj.borderRadius = message.borderRadius);
    message.borderWidth !== undefined && (obj.borderWidth = message.borderWidth);
    message.buttonSize !== undefined && (obj.buttonSize = message.buttonSize);
    message.buttonText !== undefined && (obj.buttonText = message.buttonText);
    message.buttonTheme !== undefined && (obj.buttonTheme = message.buttonTheme);
    message.backgroundColor !== undefined && (obj.backgroundColor = message.backgroundColor);
    message.borderColor !== undefined && (obj.borderColor = message.borderColor);
    return obj;
  },
};

const baseButtonConfig: object = {};

export const ButtonConfig = {
  fromJSON(object: any): ButtonConfig {
    const message = { ...baseButtonConfig } as ButtonConfig;
    if (object.width !== undefined && object.width !== null) {
      message.width = String(object.width);
    } else {
      message.width = undefined;
    }
    if (object.alignment !== undefined && object.alignment !== null) {
      message.alignment = String(object.alignment);
    } else {
      message.alignment = undefined;
    }
    return message;
  },

  toJSON(message: ButtonConfig): unknown {
    const obj: any = {};
    message.width !== undefined && (obj.width = message.width);
    message.alignment !== undefined && (obj.alignment = message.alignment);
    return obj;
  },
};
