import SoundCloudViewer from './soundcloud-viewer';
import { SOUNDCLOUD_TYPE } from './types';
import { containerClassName } from './classNameStrategies';

export const typeMapper = () => ({
  [SOUNDCLOUD_TYPE]: { component: SoundCloudViewer, classNameStrategies: { container: containerClassName } },
});
