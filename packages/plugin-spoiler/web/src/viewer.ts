import { SPOILER_TYPE } from './types';
import inlineStyleMapper from './spoilerInlineStyleMapper';
import { initSpoilersContentState } from './spoilerUtilsFn';
import SpoilerViewerWrapper from './SpoilerViewerWrapper';
export {
  inlineStyleMapper as spoilerInlineStyleMapper,
  initSpoilersContentState,
  SPOILER_TYPE,
  SpoilerViewerWrapper,
};
export { default as SpoilerViewer } from './spoiler-viewer';

export const pluginSpoiler = (config = {}) => {
  return {
    config: { initSpoilersContentState, SpoilerViewerWrapper, ...config },
    type: SPOILER_TYPE,
    inlineStyleMapper,
  };
};
