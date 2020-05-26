/*
  This module exports the required CreatePluginFunction for RicosEditor.
  If your plugin uses a modal, then make sure to uncomment 'ModalsMap'.
*/

import { createSpoilerPlugin } from './createSpoilerPlugin';
import { SPOILER_TYPE } from './types';
// import { ModalsMap } from './modals';
import { DEFAULTS, THEME as theme } from './defaults';

export const pluginSpoiler = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: SPOILER_TYPE,
    createPlugin: createSpoilerPlugin,
    ModalsMap: {},
    theme,
  };
};
