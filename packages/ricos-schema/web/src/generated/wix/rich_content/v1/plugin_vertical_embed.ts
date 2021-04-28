/* eslint-disable */
export interface VerticalEmbedData {
  type: VerticalEmbedData_VerticalType;
  selectedProduct?: VerticalEmbedData_SelectedProduct;
  config?: VerticalEmbedConfig;
}

export const enum VerticalEmbedData_VerticalType {
  PRODUCT = 'PRODUCT',
  EVENT = 'EVENT',
  STORE = 'STORE',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function verticalEmbedData_VerticalTypeFromJSON(
  object: any
): VerticalEmbedData_VerticalType {
  switch (object) {
    case 0:
    case 'PRODUCT':
      return VerticalEmbedData_VerticalType.PRODUCT;
    case 1:
    case 'EVENT':
      return VerticalEmbedData_VerticalType.EVENT;
    case 2:
    case 'STORE':
      return VerticalEmbedData_VerticalType.STORE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return VerticalEmbedData_VerticalType.UNRECOGNIZED;
  }
}

export function verticalEmbedData_VerticalTypeToJSON(
  object: VerticalEmbedData_VerticalType
): string {
  switch (object) {
    case VerticalEmbedData_VerticalType.PRODUCT:
      return 'PRODUCT';
    case VerticalEmbedData_VerticalType.EVENT:
      return 'EVENT';
    case VerticalEmbedData_VerticalType.STORE:
      return 'STORE';
    default:
      return 'UNKNOWN';
  }
}

export interface VerticalEmbedData_SelectedProduct {
  id?: string;
  name?: string;
  imageSrc?: string;
  html?: string;
}

export interface VerticalEmbedConfig {}

const baseVerticalEmbedData: object = { type: VerticalEmbedData_VerticalType.PRODUCT };

export const VerticalEmbedData = {
  fromJSON(object: any): VerticalEmbedData {
    const message = { ...baseVerticalEmbedData } as VerticalEmbedData;
    if (object.type !== undefined && object.type !== null) {
      message.type = verticalEmbedData_VerticalTypeFromJSON(object.type);
    } else {
      message.type = VerticalEmbedData_VerticalType.PRODUCT;
    }
    if (object.selectedProduct !== undefined && object.selectedProduct !== null) {
      message.selectedProduct = VerticalEmbedData_SelectedProduct.fromJSON(object.selectedProduct);
    } else {
      message.selectedProduct = undefined;
    }
    if (object.config !== undefined && object.config !== null) {
      message.config = VerticalEmbedConfig.fromJSON(object.config);
    } else {
      message.config = undefined;
    }
    return message;
  },

  toJSON(message: VerticalEmbedData): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = verticalEmbedData_VerticalTypeToJSON(message.type));
    message.selectedProduct !== undefined &&
      (obj.selectedProduct = message.selectedProduct
        ? VerticalEmbedData_SelectedProduct.toJSON(message.selectedProduct)
        : undefined);
    message.config !== undefined &&
      (obj.config = message.config ? VerticalEmbedConfig.toJSON(message.config) : undefined);
    return obj;
  },
};

const baseVerticalEmbedData_SelectedProduct: object = {};

export const VerticalEmbedData_SelectedProduct = {
  fromJSON(object: any): VerticalEmbedData_SelectedProduct {
    const message = {
      ...baseVerticalEmbedData_SelectedProduct,
    } as VerticalEmbedData_SelectedProduct;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = undefined;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = undefined;
    }
    if (object.imageSrc !== undefined && object.imageSrc !== null) {
      message.imageSrc = String(object.imageSrc);
    } else {
      message.imageSrc = undefined;
    }
    if (object.html !== undefined && object.html !== null) {
      message.html = String(object.html);
    } else {
      message.html = undefined;
    }
    return message;
  },

  toJSON(message: VerticalEmbedData_SelectedProduct): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.imageSrc !== undefined && (obj.imageSrc = message.imageSrc);
    message.html !== undefined && (obj.html = message.html);
    return obj;
  },
};

const baseVerticalEmbedConfig: object = {};

export const VerticalEmbedConfig = {
  fromJSON(_: any): VerticalEmbedConfig {
    const message = { ...baseVerticalEmbedConfig } as VerticalEmbedConfig;
    return message;
  },

  toJSON(_: VerticalEmbedConfig): unknown {
    const obj: any = {};
    return obj;
  },
};
