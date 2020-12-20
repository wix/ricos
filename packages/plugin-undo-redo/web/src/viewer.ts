import { UNDO_REDO_TYPE, UndoRedoPluginViewerConfig } from './types';
import { DEFAULTS } from './defaults';
import { ViewerPluginCreator } from 'wix-rich-content-common';

export const pluginUndoRedo: ViewerPluginCreator<UndoRedoPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: UNDO_REDO_TYPE,
  };
};
