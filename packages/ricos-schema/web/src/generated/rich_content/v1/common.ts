/* eslint-disable */
export interface TextStyle {
  textAlignment: TextStyle_TextAlignment;
  /** css value */
  lineHeight?: string;
  /** css value */
  paddingTop?: string;
  /** css value */
  paddingBottom?: string;
}

export const enum TextStyle_TextAlignment {
  AUTO = 'AUTO',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  CENTER = 'CENTER',
  JUSTIFY = 'JUSTIFY',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function textStyle_TextAlignmentFromJSON(object: any): TextStyle_TextAlignment {
  switch (object) {
    case 0:
    case 'AUTO':
      return TextStyle_TextAlignment.AUTO;
    case 1:
    case 'LEFT':
      return TextStyle_TextAlignment.LEFT;
    case 2:
    case 'RIGHT':
      return TextStyle_TextAlignment.RIGHT;
    case 3:
    case 'CENTER':
      return TextStyle_TextAlignment.CENTER;
    case 4:
    case 'JUSTIFY':
      return TextStyle_TextAlignment.JUSTIFY;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return TextStyle_TextAlignment.UNRECOGNIZED;
  }
}

export function textStyle_TextAlignmentToJSON(object: TextStyle_TextAlignment): string {
  switch (object) {
    case TextStyle_TextAlignment.AUTO:
      return 'AUTO';
    case TextStyle_TextAlignment.LEFT:
      return 'LEFT';
    case TextStyle_TextAlignment.RIGHT:
      return 'RIGHT';
    case TextStyle_TextAlignment.CENTER:
      return 'CENTER';
    case TextStyle_TextAlignment.JUSTIFY:
      return 'JUSTIFY';
    default:
      return 'UNKNOWN';
  }
}

export interface Link {
  url: string | undefined;
  /** key of node in document */
  anchor: string | undefined;
  target: Link_Target;
  rel?: Link_Rel;
  /** serialized object, used for custom/external link panel */
  customData?: string;
}

export const enum Link_Target {
  TOP = 'TOP',
  BLANK = 'BLANK',
  PARENT = 'PARENT',
  SELF = 'SELF',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function link_TargetFromJSON(object: any): Link_Target {
  switch (object) {
    case 0:
    case 'TOP':
      return Link_Target.TOP;
    case 1:
    case 'BLANK':
      return Link_Target.BLANK;
    case 2:
    case 'PARENT':
      return Link_Target.PARENT;
    case 3:
    case 'SELF':
      return Link_Target.SELF;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return Link_Target.UNRECOGNIZED;
  }
}

export function link_TargetToJSON(object: Link_Target): string {
  switch (object) {
    case Link_Target.TOP:
      return 'TOP';
    case Link_Target.BLANK:
      return 'BLANK';
    case Link_Target.PARENT:
      return 'PARENT';
    case Link_Target.SELF:
      return 'SELF';
    default:
      return 'UNKNOWN';
  }
}

export interface Link_Rel {
  /** Indicates to search engine crawlers that the link should not be followed */
  nofollow?: boolean;
  /** paid links */
  sponsored?: boolean;
  /** UoU generated link */
  ugc?: boolean;
}

export interface PluginContainerData {
  width?: PluginContainerData_Width;
  alignment: PluginContainerData_Alignment;
  spoiler?: PluginContainerData_Spoiler;
}

export const enum PluginContainerData_Alignment {
  CENTER = 'CENTER',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function pluginContainerData_AlignmentFromJSON(object: any): PluginContainerData_Alignment {
  switch (object) {
    case 0:
    case 'CENTER':
      return PluginContainerData_Alignment.CENTER;
    case 1:
    case 'LEFT':
      return PluginContainerData_Alignment.LEFT;
    case 2:
    case 'RIGHT':
      return PluginContainerData_Alignment.RIGHT;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return PluginContainerData_Alignment.UNRECOGNIZED;
  }
}

export function pluginContainerData_AlignmentToJSON(object: PluginContainerData_Alignment): string {
  switch (object) {
    case PluginContainerData_Alignment.CENTER:
      return 'CENTER';
    case PluginContainerData_Alignment.LEFT:
      return 'LEFT';
    case PluginContainerData_Alignment.RIGHT:
      return 'RIGHT';
    default:
      return 'UNKNOWN';
  }
}

export interface PluginContainerData_Spoiler {
  description?: string;
  buttonText?: string;
}

export interface PluginContainerData_Width {
  type: PluginContainerData_Width_Type;
  customWidth?: number;
}

export const enum PluginContainerData_Width_Type {
  CONTENT = 'CONTENT',
  SMALL = 'SMALL',
  ORIGINAL = 'ORIGINAL',
  FULL_WIDTH = 'FULL_WIDTH',
  CUSTOM = 'CUSTOM',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function pluginContainerData_Width_TypeFromJSON(
  object: any
): PluginContainerData_Width_Type {
  switch (object) {
    case 0:
    case 'CONTENT':
      return PluginContainerData_Width_Type.CONTENT;
    case 1:
    case 'SMALL':
      return PluginContainerData_Width_Type.SMALL;
    case 2:
    case 'ORIGINAL':
      return PluginContainerData_Width_Type.ORIGINAL;
    case 3:
    case 'FULL_WIDTH':
      return PluginContainerData_Width_Type.FULL_WIDTH;
    case 4:
    case 'CUSTOM':
      return PluginContainerData_Width_Type.CUSTOM;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return PluginContainerData_Width_Type.UNRECOGNIZED;
  }
}

export function pluginContainerData_Width_TypeToJSON(
  object: PluginContainerData_Width_Type
): string {
  switch (object) {
    case PluginContainerData_Width_Type.CONTENT:
      return 'CONTENT';
    case PluginContainerData_Width_Type.SMALL:
      return 'SMALL';
    case PluginContainerData_Width_Type.ORIGINAL:
      return 'ORIGINAL';
    case PluginContainerData_Width_Type.FULL_WIDTH:
      return 'FULL_WIDTH';
    case PluginContainerData_Width_Type.CUSTOM:
      return 'CUSTOM';
    default:
      return 'UNKNOWN';
  }
}

/** passes through srcToUrl function when provided */
export interface FileSource {
  url?: string;
  /** e.g. an id for media server */
  custom?: string;
}

export interface Media {
  src?: FileSource;
  width?: number;
  height?: number;
}

const baseTextStyle: object = { textAlignment: TextStyle_TextAlignment.AUTO };

export const TextStyle = {
  fromJSON(object: any): TextStyle {
    const message = { ...baseTextStyle } as TextStyle;
    if (object.textAlignment !== undefined && object.textAlignment !== null) {
      message.textAlignment = textStyle_TextAlignmentFromJSON(object.textAlignment);
    } else {
      message.textAlignment = TextStyle_TextAlignment.AUTO;
    }
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

  toJSON(message: TextStyle): unknown {
    const obj: any = {};
    message.textAlignment !== undefined &&
      (obj.textAlignment = textStyle_TextAlignmentToJSON(message.textAlignment));
    message.lineHeight !== undefined && (obj.lineHeight = message.lineHeight);
    message.paddingTop !== undefined && (obj.paddingTop = message.paddingTop);
    message.paddingBottom !== undefined && (obj.paddingBottom = message.paddingBottom);
    return obj;
  },
};

const baseLink: object = { target: Link_Target.TOP };

export const Link = {
  fromJSON(object: any): Link {
    const message = { ...baseLink } as Link;
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = undefined;
    }
    if (object.anchor !== undefined && object.anchor !== null) {
      message.anchor = String(object.anchor);
    } else {
      message.anchor = undefined;
    }
    if (object.target !== undefined && object.target !== null) {
      message.target = link_TargetFromJSON(object.target);
    } else {
      message.target = Link_Target.TOP;
    }
    if (object.rel !== undefined && object.rel !== null) {
      message.rel = Link_Rel.fromJSON(object.rel);
    } else {
      message.rel = undefined;
    }
    if (object.customData !== undefined && object.customData !== null) {
      message.customData = String(object.customData);
    } else {
      message.customData = undefined;
    }
    return message;
  },

  toJSON(message: Link): unknown {
    const obj: any = {};
    message.url !== undefined && (obj.url = message.url);
    message.anchor !== undefined && (obj.anchor = message.anchor);
    message.target !== undefined && (obj.target = link_TargetToJSON(message.target));
    message.rel !== undefined && (obj.rel = message.rel ? Link_Rel.toJSON(message.rel) : undefined);
    message.customData !== undefined && (obj.customData = message.customData);
    return obj;
  },
};

const baseLink_Rel: object = {};

export const Link_Rel = {
  fromJSON(object: any): Link_Rel {
    const message = { ...baseLink_Rel } as Link_Rel;
    if (object.nofollow !== undefined && object.nofollow !== null) {
      message.nofollow = Boolean(object.nofollow);
    } else {
      message.nofollow = undefined;
    }
    if (object.sponsored !== undefined && object.sponsored !== null) {
      message.sponsored = Boolean(object.sponsored);
    } else {
      message.sponsored = undefined;
    }
    if (object.ugc !== undefined && object.ugc !== null) {
      message.ugc = Boolean(object.ugc);
    } else {
      message.ugc = undefined;
    }
    return message;
  },

  toJSON(message: Link_Rel): unknown {
    const obj: any = {};
    message.nofollow !== undefined && (obj.nofollow = message.nofollow);
    message.sponsored !== undefined && (obj.sponsored = message.sponsored);
    message.ugc !== undefined && (obj.ugc = message.ugc);
    return obj;
  },
};

const basePluginContainerData: object = { alignment: PluginContainerData_Alignment.CENTER };

export const PluginContainerData = {
  fromJSON(object: any): PluginContainerData {
    const message = { ...basePluginContainerData } as PluginContainerData;
    if (object.width !== undefined && object.width !== null) {
      message.width = PluginContainerData_Width.fromJSON(object.width);
    } else {
      message.width = undefined;
    }
    if (object.alignment !== undefined && object.alignment !== null) {
      message.alignment = pluginContainerData_AlignmentFromJSON(object.alignment);
    } else {
      message.alignment = PluginContainerData_Alignment.CENTER;
    }
    if (object.spoiler !== undefined && object.spoiler !== null) {
      message.spoiler = PluginContainerData_Spoiler.fromJSON(object.spoiler);
    } else {
      message.spoiler = undefined;
    }
    return message;
  },

  toJSON(message: PluginContainerData): unknown {
    const obj: any = {};
    message.width !== undefined &&
      (obj.width = message.width ? PluginContainerData_Width.toJSON(message.width) : undefined);
    message.alignment !== undefined &&
      (obj.alignment = pluginContainerData_AlignmentToJSON(message.alignment));
    message.spoiler !== undefined &&
      (obj.spoiler = message.spoiler
        ? PluginContainerData_Spoiler.toJSON(message.spoiler)
        : undefined);
    return obj;
  },
};

const basePluginContainerData_Spoiler: object = {};

export const PluginContainerData_Spoiler = {
  fromJSON(object: any): PluginContainerData_Spoiler {
    const message = { ...basePluginContainerData_Spoiler } as PluginContainerData_Spoiler;
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = undefined;
    }
    if (object.buttonText !== undefined && object.buttonText !== null) {
      message.buttonText = String(object.buttonText);
    } else {
      message.buttonText = undefined;
    }
    return message;
  },

  toJSON(message: PluginContainerData_Spoiler): unknown {
    const obj: any = {};
    message.description !== undefined && (obj.description = message.description);
    message.buttonText !== undefined && (obj.buttonText = message.buttonText);
    return obj;
  },
};

const basePluginContainerData_Width: object = { type: PluginContainerData_Width_Type.CONTENT };

export const PluginContainerData_Width = {
  fromJSON(object: any): PluginContainerData_Width {
    const message = { ...basePluginContainerData_Width } as PluginContainerData_Width;
    if (object.type !== undefined && object.type !== null) {
      message.type = pluginContainerData_Width_TypeFromJSON(object.type);
    } else {
      message.type = PluginContainerData_Width_Type.CONTENT;
    }
    if (object.customWidth !== undefined && object.customWidth !== null) {
      message.customWidth = Number(object.customWidth);
    } else {
      message.customWidth = undefined;
    }
    return message;
  },

  toJSON(message: PluginContainerData_Width): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = pluginContainerData_Width_TypeToJSON(message.type));
    message.customWidth !== undefined && (obj.customWidth = message.customWidth);
    return obj;
  },
};

const baseFileSource: object = {};

export const FileSource = {
  fromJSON(object: any): FileSource {
    const message = { ...baseFileSource } as FileSource;
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = undefined;
    }
    if (object.custom !== undefined && object.custom !== null) {
      message.custom = String(object.custom);
    } else {
      message.custom = undefined;
    }
    return message;
  },

  toJSON(message: FileSource): unknown {
    const obj: any = {};
    message.url !== undefined && (obj.url = message.url);
    message.custom !== undefined && (obj.custom = message.custom);
    return obj;
  },
};

const baseMedia: object = {};

export const Media = {
  fromJSON(object: any): Media {
    const message = { ...baseMedia } as Media;
    if (object.src !== undefined && object.src !== null) {
      message.src = FileSource.fromJSON(object.src);
    } else {
      message.src = undefined;
    }
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
    return message;
  },

  toJSON(message: Media): unknown {
    const obj: any = {};
    message.src !== undefined &&
      (obj.src = message.src ? FileSource.toJSON(message.src) : undefined);
    message.width !== undefined && (obj.width = message.width);
    message.height !== undefined && (obj.height = message.height);
    return obj;
  },
};
