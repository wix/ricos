import { getLinkRangesInBlock, ViewerPlugin } from 'wix-rich-content-common';
import { default as createHashtagDecorator } from './HashtagDecorator';
import { HASHTAG_TYPE, HashtagPluginViewerConfig } from './types';
import { DEFAULTS } from './defaults';
const HashtagDecorator = createHashtagDecorator(getLinkRangesInBlock);
export { HashtagDecorator };

export const pluginHashtag: ViewerPlugin<HashtagPluginViewerConfig> = config => {
  const pluginConfig = { ...DEFAULTS.config, ...config };
  return {
    config: pluginConfig,
    type: HASHTAG_TYPE,
    decorator: theme => new HashtagDecorator({ theme, ...pluginConfig }),
  };
};
