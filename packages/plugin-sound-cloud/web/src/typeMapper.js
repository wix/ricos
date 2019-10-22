import SoundCloudViewer from './soundCloud-viewer';
import { SOUND_CLOUD_TYPE } from './types';
import { containerClassName } from './classNameStrategies';

export const typeMapper = () => ({
  [SOUND_CLOUD_TYPE]: {
    component: SoundCloudViewer,
    classNameStrategies: { container: containerClassName },
  },
});
