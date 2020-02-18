import { hasLinksInBlock } from 'wix-rich-content-common';
import { default as createHashtagDecorator } from './HashtagDecorator';
const HashtagDecorator = createHashtagDecorator(hasLinksInBlock);
export { HashtagDecorator };

import { HASHTAG_TYPE } from './types';
import { DEFAULTS } from './defaults';

export const pluginHashtag = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: HASHTAG_TYPE,
    decorator: HashtagDecorator,
    theme: colors => ({
      hashtag: {
        color: colors.actionColor,
      },
    }),
  };
};
