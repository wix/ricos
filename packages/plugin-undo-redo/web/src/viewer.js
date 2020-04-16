import { UNDO_REDO_TYPE } from './types';
import { DEFAULTS } from './defaults';

export const pluginUndoRedo = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: UNDO_REDO_TYPE,
  };
};
