import { SPOILER_TYPE } from './types';
import inlineStyleMapper from './spoilerInlineStyleMapper';
import { initSpoilersContentState } from './spoilerUtilsFn';
export { inlineStyleMapper as spoilerInlineStyleMapper, initSpoilersContentState, SPOILER_TYPE };
export { default as SpoilerViewer } from './spoiler-viewer';

export const pluginSpoiler = (config = {}) => {
  return {
    config: { initSpoilersContentState, ...config },
    type: SPOILER_TYPE,
    inlineStyleMapper,
  };
};
