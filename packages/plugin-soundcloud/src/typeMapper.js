import SoundcloudViewer from './soundcloud-viewer';
import { SOUNDCLOUD_TYPE } from './types';
import { containerClassName } from './classNameStrategies';

export const typeMapper = () => ({
  [SOUNDCLOUD_TYPE]: { component: SoundcloudViewer, classNameStrategies: { container: containerClassName } },
});
