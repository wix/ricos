import { SPOILER_TYPE } from './types';
import inlineStyleMapper from './spoilerInlineStyleMapper';
export { inlineStyleMapper as spoilerInlineStyleMapper, SPOILER_TYPE };
export { default as SpoilerViewer } from './spoiler-viewer';

export const pluginSpoiler = (config = {}) => {
  return {
    config,
    type: SPOILER_TYPE,
    inlineStyleMapper,
  };
};
