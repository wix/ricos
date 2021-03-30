/* eslint-disable */
export interface GiphyData {
  gif?: GIFSource;
  config?: GiphyConfig;
  configViewer?: GIphyConfigViewer;
}

export interface GIFSource {
  height: number;
  width: number;
  originalUrl: string;
  stillUrl: string;
  originalMp4?: string;
  downsizedUrl?: string;
  downsizedStillUrl?: string;
  downsizedSmallMp4?: string;
}

export interface GiphyConfig {
  size?: string;
  alignment?: string;
}

export interface GIphyConfigViewer {
  sizes?: GIphyConfigViewer_GiphyViewerSizes;
}

export const enum GIphyConfigViewer_GiphyViewerSize {
  ORIGINAL = 'ORIGINAL',
  DOWNSIZED_SMALL = 'DOWNSIZED_SMALL',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function gIphyConfigViewer_GiphyViewerSizeFromJSON(
  object: any
): GIphyConfigViewer_GiphyViewerSize {
  switch (object) {
    case 0:
    case 'ORIGINAL':
      return GIphyConfigViewer_GiphyViewerSize.ORIGINAL;
    case 1:
    case 'DOWNSIZED_SMALL':
      return GIphyConfigViewer_GiphyViewerSize.DOWNSIZED_SMALL;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return GIphyConfigViewer_GiphyViewerSize.UNRECOGNIZED;
  }
}

export function gIphyConfigViewer_GiphyViewerSizeToJSON(
  object: GIphyConfigViewer_GiphyViewerSize
): string {
  switch (object) {
    case GIphyConfigViewer_GiphyViewerSize.ORIGINAL:
      return 'ORIGINAL';
    case GIphyConfigViewer_GiphyViewerSize.DOWNSIZED_SMALL:
      return 'DOWNSIZED_SMALL';
    default:
      return 'UNKNOWN';
  }
}

export interface GIphyConfigViewer_GiphyViewerSizes {
  desktop: GIphyConfigViewer_GiphyViewerSize;
  mobile: GIphyConfigViewer_GiphyViewerSize;
}

const baseGiphyData: object = {};

export const GiphyData = {
  fromJSON(object: any): GiphyData {
    const message = { ...baseGiphyData } as GiphyData;
    if (object.gif !== undefined && object.gif !== null) {
      message.gif = GIFSource.fromJSON(object.gif);
    } else {
      message.gif = undefined;
    }
    if (object.config !== undefined && object.config !== null) {
      message.config = GiphyConfig.fromJSON(object.config);
    } else {
      message.config = undefined;
    }
    if (object.configViewer !== undefined && object.configViewer !== null) {
      message.configViewer = GIphyConfigViewer.fromJSON(object.configViewer);
    } else {
      message.configViewer = undefined;
    }
    return message;
  },

  toJSON(message: GiphyData): unknown {
    const obj: any = {};
    message.gif !== undefined &&
      (obj.gif = message.gif ? GIFSource.toJSON(message.gif) : undefined);
    message.config !== undefined &&
      (obj.config = message.config ? GiphyConfig.toJSON(message.config) : undefined);
    message.configViewer !== undefined &&
      (obj.configViewer = message.configViewer
        ? GIphyConfigViewer.toJSON(message.configViewer)
        : undefined);
    return obj;
  },
};

const baseGIFSource: object = { height: 0, width: 0, originalUrl: '', stillUrl: '' };

export const GIFSource = {
  fromJSON(object: any): GIFSource {
    const message = { ...baseGIFSource } as GIFSource;
    if (object.height !== undefined && object.height !== null) {
      message.height = Number(object.height);
    } else {
      message.height = 0;
    }
    if (object.width !== undefined && object.width !== null) {
      message.width = Number(object.width);
    } else {
      message.width = 0;
    }
    if (object.originalUrl !== undefined && object.originalUrl !== null) {
      message.originalUrl = String(object.originalUrl);
    } else {
      message.originalUrl = '';
    }
    if (object.stillUrl !== undefined && object.stillUrl !== null) {
      message.stillUrl = String(object.stillUrl);
    } else {
      message.stillUrl = '';
    }
    if (object.originalMp4 !== undefined && object.originalMp4 !== null) {
      message.originalMp4 = String(object.originalMp4);
    } else {
      message.originalMp4 = undefined;
    }
    if (object.downsizedUrl !== undefined && object.downsizedUrl !== null) {
      message.downsizedUrl = String(object.downsizedUrl);
    } else {
      message.downsizedUrl = undefined;
    }
    if (object.downsizedStillUrl !== undefined && object.downsizedStillUrl !== null) {
      message.downsizedStillUrl = String(object.downsizedStillUrl);
    } else {
      message.downsizedStillUrl = undefined;
    }
    if (object.downsizedSmallMp4 !== undefined && object.downsizedSmallMp4 !== null) {
      message.downsizedSmallMp4 = String(object.downsizedSmallMp4);
    } else {
      message.downsizedSmallMp4 = undefined;
    }
    return message;
  },

  toJSON(message: GIFSource): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.width !== undefined && (obj.width = message.width);
    message.originalUrl !== undefined && (obj.originalUrl = message.originalUrl);
    message.stillUrl !== undefined && (obj.stillUrl = message.stillUrl);
    message.originalMp4 !== undefined && (obj.originalMp4 = message.originalMp4);
    message.downsizedUrl !== undefined && (obj.downsizedUrl = message.downsizedUrl);
    message.downsizedStillUrl !== undefined && (obj.downsizedStillUrl = message.downsizedStillUrl);
    message.downsizedSmallMp4 !== undefined && (obj.downsizedSmallMp4 = message.downsizedSmallMp4);
    return obj;
  },
};

const baseGiphyConfig: object = {};

export const GiphyConfig = {
  fromJSON(object: any): GiphyConfig {
    const message = { ...baseGiphyConfig } as GiphyConfig;
    if (object.size !== undefined && object.size !== null) {
      message.size = String(object.size);
    } else {
      message.size = undefined;
    }
    if (object.alignment !== undefined && object.alignment !== null) {
      message.alignment = String(object.alignment);
    } else {
      message.alignment = undefined;
    }
    return message;
  },

  toJSON(message: GiphyConfig): unknown {
    const obj: any = {};
    message.size !== undefined && (obj.size = message.size);
    message.alignment !== undefined && (obj.alignment = message.alignment);
    return obj;
  },
};

const baseGIphyConfigViewer: object = {};

export const GIphyConfigViewer = {
  fromJSON(object: any): GIphyConfigViewer {
    const message = { ...baseGIphyConfigViewer } as GIphyConfigViewer;
    if (object.sizes !== undefined && object.sizes !== null) {
      message.sizes = GIphyConfigViewer_GiphyViewerSizes.fromJSON(object.sizes);
    } else {
      message.sizes = undefined;
    }
    return message;
  },

  toJSON(message: GIphyConfigViewer): unknown {
    const obj: any = {};
    message.sizes !== undefined &&
      (obj.sizes = message.sizes
        ? GIphyConfigViewer_GiphyViewerSizes.toJSON(message.sizes)
        : undefined);
    return obj;
  },
};

const baseGIphyConfigViewer_GiphyViewerSizes: object = {
  desktop: GIphyConfigViewer_GiphyViewerSize.ORIGINAL,
  mobile: GIphyConfigViewer_GiphyViewerSize.ORIGINAL,
};

export const GIphyConfigViewer_GiphyViewerSizes = {
  fromJSON(object: any): GIphyConfigViewer_GiphyViewerSizes {
    const message = {
      ...baseGIphyConfigViewer_GiphyViewerSizes,
    } as GIphyConfigViewer_GiphyViewerSizes;
    if (object.desktop !== undefined && object.desktop !== null) {
      message.desktop = gIphyConfigViewer_GiphyViewerSizeFromJSON(object.desktop);
    } else {
      message.desktop = GIphyConfigViewer_GiphyViewerSize.ORIGINAL;
    }
    if (object.mobile !== undefined && object.mobile !== null) {
      message.mobile = gIphyConfigViewer_GiphyViewerSizeFromJSON(object.mobile);
    } else {
      message.mobile = GIphyConfigViewer_GiphyViewerSize.ORIGINAL;
    }
    return message;
  },

  toJSON(message: GIphyConfigViewer_GiphyViewerSizes): unknown {
    const obj: any = {};
    message.desktop !== undefined &&
      (obj.desktop = gIphyConfigViewer_GiphyViewerSizeToJSON(message.desktop));
    message.mobile !== undefined &&
      (obj.mobile = gIphyConfigViewer_GiphyViewerSizeToJSON(message.mobile));
    return obj;
  },
};
