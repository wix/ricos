import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const IMAGE_TYPE = 'wix-draft-plugin-image';
export const IMAGE_TYPE_LEGACY = 'IMAGE';

export type ImageEditorWixSettings = {
  initiator: string;
  siteToken: string;
  metaSiteId: string;
  mediaRoot: string;
};

interface ImageConfig {
  size?: string;
  alignment?: string;
  disableExpand?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
}

export interface ImagePluginEditorConfig extends EditorPluginConfig, ImageConfig {
  defaultData?: {
    config?: ImageConfig;
  };
  imageProps?: HTMLImageElement;
  createGalleryForMultipleImages?: boolean;
  imageEditorWixSettings?: ImageEditorWixSettings;
  onImageEditorOpen?: () => void;
}

export interface ImagePluginViewerConfig extends ViewerPluginConfig {
  disableExpand: boolean;
}
