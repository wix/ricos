/*
  This module exports the required CreatePluginFunction for RicosEditor.
  If your plugin uses a modal, then make sure to uncomment 'ModalsMap'.
*/

import { createUnavailableOnOneappPlugin } from './createUnavailableOnOneappPlugin';
import { UNAVAILABLE_ON_ONEAPP_TYPE, UnavailableOnOneAppPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginUnavailableOnOneApp: EditorPluginCreator<UnavailableOnOneAppPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: UNAVAILABLE_ON_ONEAPP_TYPE,
    createPlugin: createUnavailableOnOneappPlugin,
  };
};
