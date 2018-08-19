import SoundcloudV from './soundcloud-v';
import { SOUNDCLOUD_TYPE_LEGACY, SOUNDCLOUD_TYPE } from './types';
import { containerClassName } from './classNameStrategies';

export const typeMapper = () => ({
  [SOUNDCLOUD_TYPE_LEGACY]: { component: SoundcloudV, classNameStrategies: { container: containerClassName } },
  [SOUNDCLOUD_TYPE]: { component: SoundcloudV, classNameStrategies: { container: containerClassName } },
});
