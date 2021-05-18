import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const EXTERNAL_LINK_TYPE = 'wix-draft-plugin-external-link';
export const LINK_TYPE = 'LINK';
export const CUSTOM_LINK_TYPE = 'ricos-plugin-custom-link';

export interface LinkPluginEditorConfig extends EditorPluginConfig {
  toolbar?: {
    hidden?: string[];
    icons?: {
      [key: string]: (props) => JSX.Element;
    };
    inlineToolbar?: boolean;
  };
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface LinkPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
