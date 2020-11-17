import { EditorPluginConfig } from 'wix-rich-content-common';

export const HEADINGS_DROPDOWN_TYPE = 'wix-rich-content-plugin-headings';

export interface HeadingsPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
