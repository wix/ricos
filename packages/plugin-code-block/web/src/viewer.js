import { default as CodeBlockDecorator } from './PrismDecorator';
export { CodeBlockDecorator };

import { CODE_BLOCK_TYPE } from './types';
import { DEFAULTS } from './defaults';
export const pluginCodeBlock = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: CODE_BLOCK_TYPE,
    decorator: theme => new CodeBlockDecorator(theme),
  };
};
