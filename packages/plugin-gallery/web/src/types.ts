import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const GALLERY_TYPE = 'wix-draft-plugin-gallery';

export interface GalleryPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface GalleryPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
