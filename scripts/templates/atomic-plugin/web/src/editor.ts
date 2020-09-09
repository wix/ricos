/*
  This module exports the required CreatePluginFunction for RicosEditor.
  If your plugin uses a modal, then make sure to uncomment 'ModalsMap'.
*/

import { createYourPluginNamePlugin } from './createYourPluginNamePlugin';
import { YOUR_PLUGIN_NAME_TYPE } from './types';
// import { ModalsMap } from './modals';
import { DEFAULTS, theme } from './defaults';

export const pluginYourPluginName = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: YOUR_PLUGIN_NAME_TYPE,
    createPlugin: createYourPluginNamePlugin,
    // ModalsMap,
    theme,
  };
};
