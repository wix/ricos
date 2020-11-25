import { default as CodeBlockDecorator } from './PrismDecorator';
export { CodeBlockDecorator };

import { CODE_BLOCK_TYPE, CodeBlockPluginViewerConfig } from './types';
import { DEFAULTS } from './defaults';
import { ViewerPluginCreator } from 'wix-rich-content-common';

export const pluginCodeBlock: ViewerPluginCreator<CodeBlockPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: CODE_BLOCK_TYPE,
    decorator: theme => new CodeBlockDecorator(theme),
  };
};
