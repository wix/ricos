import { UNDO_REDO_TYPE, UndoRedoPluginViewerConfig } from './types';
import { DEFAULTS } from './defaults';
import { ViewerPlugin } from 'wix-rich-content-common';

export const pluginUndoRedo: ViewerPlugin<UndoRedoPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: UNDO_REDO_TYPE,
  };
};
