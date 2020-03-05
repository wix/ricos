import { linksInBlock } from 'wix-rich-content-common';
import { default as createHashtagDecorator } from './HashtagDecorator';
import { HASHTAG_TYPE } from './types';
import { DEFAULTS, THEME as theme } from './defaults';
const HashtagDecorator = createHashtagDecorator(linksInBlock);
export { HashtagDecorator };

export const pluginHashtag = (config = {}) => {
  const pluginConfig = { ...DEFAULTS.config, ...config };
  return {
    config: pluginConfig,
    type: HASHTAG_TYPE,
    decorator: theme => new HashtagDecorator({ ...pluginConfig, ...theme }),
    theme,
  };
};
