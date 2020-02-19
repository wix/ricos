import { hasLinksInBlock } from 'wix-rich-content-common';
import { default as createHashtagDecorator } from './HashtagDecorator';
const HashtagDecorator = createHashtagDecorator(hasLinksInBlock);
export { HashtagDecorator };

import { HASHTAG_TYPE } from './types';
import { DEFAULTS } from './defaults';

export const pluginHashtag = (config = {}) => {
  const pluginConfig = { ...DEFAULTS.config, ...config };
  const decorator = new HashtagDecorator(pluginConfig);
  return {
    config: pluginConfig,
    type: HASHTAG_TYPE,
    decorator,
    theme: colors => ({
      hashtag: {
        color: colors.actionColor,
      },
    }),
  };
};
