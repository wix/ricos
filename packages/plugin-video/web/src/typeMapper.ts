import VideoViewer from './video-viewer';
import { VIDEO_TYPE_LEGACY, VIDEO_TYPE } from './types';
import { containerClassName } from './classNameStrategies';
import { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [VIDEO_TYPE_LEGACY]: {
    component: VideoViewer,
    classNameStrategies: { container: containerClassName },
  },
  [VIDEO_TYPE]: {
    component: VideoViewer,
    classNameStrategies: { container: containerClassName },
  },
});
