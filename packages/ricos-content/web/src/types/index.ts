export type NormalizeConfig = {
  anchorTarget?: string;
  relValue?: string;
  disableInlineImages?: boolean;
  removeInvalidInlinePlugins?: boolean;
  disableDownload?: boolean;
  disableImagesExpand?: boolean;
  disableGalleryExpand?: boolean;
};

export interface ComponentData {
  config?: {
    alignment?: string;
    size?: string;
    url?: string;
    textWrap?: string;
    width?: number | string;
    height?: number;
    spoiler?: { enabled?: boolean; description?: string; buttonContent?: string };
    link?: { url?: string; rel?: string; target?: string };
    anchor?: string;
    disableExpand?: boolean;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  src?: any;
  srcType?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

export type LinkRange = {
  text: string;
  index: number;
  lastIndex: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NormalizationProcessor<T> = (processed: T, ...args: any[]) => T;

export * from './contentTypes';
export * from './contentApi';
export * from './mediaUploadTypes';
