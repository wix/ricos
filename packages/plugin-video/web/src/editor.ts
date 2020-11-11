import { createVideoPlugin } from './createVideoPlugin';
import { VIDEO_TYPE, VideoPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { ModalsMap } from './modals';
import { EditorPluginFunction } from 'wix-rich-content-common';

export const pluginVideo: EditorPluginFunction<VideoPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: VIDEO_TYPE,
    createPlugin: createVideoPlugin,
    ModalsMap,
  };
};
