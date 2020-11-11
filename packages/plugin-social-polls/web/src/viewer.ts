import { typeMapper } from './typeMapper';
import { DEFAULT_COMPONENT_DATA } from './defaults';
import { POLL_TYPE, PollPluginViewerConfig } from './types';
import { ViewerPlugin } from 'wix-rich-content-common';
export { typeMapper as pollTypeMapper, POLL_TYPE };

export const pluginPoll: ViewerPlugin<PollPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULT_COMPONENT_DATA.config, ...config },
    type: POLL_TYPE,
    typeMapper,
  };
};
