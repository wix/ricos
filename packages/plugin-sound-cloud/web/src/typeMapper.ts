import SoundCloudViewer from './soundCloud-viewer';
import { SOUND_CLOUD_TYPE } from './types';
import { containerClassName } from './classNameStrategies';
import { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [SOUND_CLOUD_TYPE]: {
    component: SoundCloudViewer,
    classNameStrategies: { container: containerClassName },
  },
});
