import VideoViewer from './video-viewer';
import { VIDEO_TYPE_LEGACY, VIDEO_TYPE } from './types';
import { containerClassName } from './classNameStrategies';

export const typeMapper = () => ({
  [VIDEO_TYPE_LEGACY]: {
    component: VideoViewer,
    classNameStrategies: { container: containerClassName },
  },
  [VIDEO_TYPE]: { component: VideoViewer, classNameStrategies: { container: containerClassName } },
});
