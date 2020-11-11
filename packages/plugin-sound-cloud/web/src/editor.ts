import { createSoundCloudPlugin } from './createSoundCloudPlugin';
import { SOUND_CLOUD_TYPE, SoundCloudPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { ModalsMap } from './modals';
import { EditorPlugin } from 'wix-rich-content-common';

export const pluginSoundCloud: EditorPlugin<SoundCloudPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: SOUND_CLOUD_TYPE,
    createPlugin: createSoundCloudPlugin,
    ModalsMap,
  };
};
