import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

// export const UNSUPPORTED_BLOCKS_TYPE = 'unsupported-blocks';

export interface UnsupportedBlocksPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface UnsupportedBlocksPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
