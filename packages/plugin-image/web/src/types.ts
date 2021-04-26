import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const IMAGE_TYPE = 'wix-draft-plugin-image';
export const IMAGE_TYPE_LEGACY = 'IMAGE';

export type ImageEditorWixSettings = {
  initiator: string;
  siteToken: string;
  metaSiteId: string;
  mediaRoot: string;
};

export interface ImageConfig {
  size?: string;
  alignment?: string;
  disableExpand?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  link?: {
    anchor: unknown;
    url: string;
  };
  width?: number;
}

export interface ImagePluginEditorConfig extends EditorPluginConfig, ImageConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  spoiler?: {
    buttonContent: string | undefined;
    description: string | undefined;
    enabled: boolean | undefined;
  };
  defaultData?: {
    config?: ImageConfig;
    disableExpand?: boolean;
  };
  imageProps?: HTMLImageElement;
  createGalleryForMultipleImages?: boolean;
  imageEditor?: boolean;
  consumer?: string;
  imageEditorWixSettings?: ImageEditorWixSettings;
  onImageEditorOpen?: () => void;
}

type ImageSrc = Record<string, unknown>;
export interface ImagePluginViewerConfig extends ViewerPluginConfig {
  onExpand?: (blockkey: string) => unknown;
  disableExpand: boolean;
  imageProps?: ((src: ImageSrc) => HTMLImageElement) | HTMLImageElement;
}
