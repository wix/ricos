import { SPOILER_TYPE, SpoilerPluginViewerConfig } from './types';
import { spoilerInlineStyleMapper } from './spoilerInlineStyleMapper';
import { initSpoilersContentState } from './spoilerUtilsFn';
import { ViewerPlugin } from 'wix-rich-content-common';
export { spoilerInlineStyleMapper, initSpoilersContentState, SPOILER_TYPE };
export { default as SpoilerViewer } from './spoiler-viewer';

export const pluginSpoiler: ViewerPlugin<SpoilerPluginViewerConfig> = config => {
  return {
    config: { initSpoilersContentState, ...config },
    type: SPOILER_TYPE,
    inlineStyleMapper: spoilerInlineStyleMapper,
  };
};
