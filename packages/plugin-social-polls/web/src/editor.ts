import { createPollPlugin } from './createPollPlugin';
import { POLL_TYPE, PollPluginEditorConfig } from './types';
import { DEFAULT_COMPONENT_DATA, theme } from './defaults';
import { ModalsMap } from './modals';
import { EditorPluginFunction } from 'wix-rich-content-common';

export const pluginPoll: EditorPluginFunction<PollPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULT_COMPONENT_DATA.config, ...config },
    type: POLL_TYPE,
    createPlugin: createPollPlugin,
    ModalsMap,
    theme,
  };
};
