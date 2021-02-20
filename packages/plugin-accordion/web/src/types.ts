import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const ACCORDION_TYPE = 'wix-rich-content-plugin-accordion';

export interface AccordionPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface AccordionPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
