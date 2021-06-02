import { createCollapsibleListPlugin } from './createCollapsibleListPlugin';
import { COLLAPSIBLE_LIST_TYPE, CollapsibleListPluginEditorConfig } from './types';
import { ModalsMap } from './modals';
import { DEFAULTS } from './defaults';
import { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginCollapsibleList: EditorPluginCreator<CollapsibleListPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: COLLAPSIBLE_LIST_TYPE,
    createPlugin: createCollapsibleListPlugin,
    ModalsMap,
  };
};
