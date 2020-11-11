import { createUndoRedoPlugin } from './createUndoRedoPlugin';
import { UNDO_REDO_TYPE, UndoRedoPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { EditorPlugin } from 'wix-rich-content-common';

export const pluginUndoRedo: EditorPlugin<UndoRedoPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: UNDO_REDO_TYPE,
    createPlugin: createUndoRedoPlugin,
    ModalsMap: {},
  };
};
