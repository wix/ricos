import { SPOILER_TYPE } from './types';
import inlineStyleMapper from './spoilerInlineStyleMapper';
import { initSpoilersContentState } from './spoilerUtilsFn';
import BlockSpoilerComponent from './BlockSpoilerComponent';
export {
  inlineStyleMapper as spoilerInlineStyleMapper,
  initSpoilersContentState,
  SPOILER_TYPE,
  BlockSpoilerComponent,
};
export { default as SpoilerViewer } from './spoiler-viewer';

export const pluginSpoiler = (config = {}) => {
  return {
    config: { initSpoilersContentState, ...config },
    type: SPOILER_TYPE,
    inlineStyleMapper,
  };
};
