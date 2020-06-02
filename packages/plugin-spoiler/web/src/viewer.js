import { SPOILER_TYPE } from './types';
import inlineStyleMapper from './spoilerInlineStyleMapper';
import { DEFAULTS, THEME as theme } from './defaults';
export { inlineStyleMapper as spoilerInlineStyleMapper, SPOILER_TYPE };
export { default as SpoilerViewer } from './spoiler-viewer';

export const pluginSpoiler = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: SPOILER_TYPE,
    inlineStyleMapper,
    theme,
  };
};
