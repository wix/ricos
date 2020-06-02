import { SPOILER_TYPE } from './types';
import { typeMapper } from './typeMapper';
import { DEFAULTS, THEME as theme } from './defaults';
export { typeMapper as spoilerTypeMapper, SPOILER_TYPE };
export { default as SpoilerViewer } from './spoiler-viewer';

export const pluginSpoiler = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: SPOILER_TYPE,
    typeMapper,
    theme,
  };
};
