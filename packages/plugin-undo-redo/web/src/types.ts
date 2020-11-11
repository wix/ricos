import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const UNDO_REDO_TYPE = 'wix-rich-content-undo-redo';

export interface UndoRedoPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface UndoRedoPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
