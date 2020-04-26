// @flow
import VideoViewer from './video-viewer';
//import { VIDEO_TYPE_LEGACY, VIDEO_TYPE } from './types';
import { containerClassName } from './classNameStrategies';

// if [VIDEO_TYPE] key is used, flow won't typecheck the value. See and upvote: https://github.com/facebook/flow/issues/4649
export const typeMapper /*: PluginTypeMapper*/ = () => ({
  'VIDEO-EMBED': { component: VideoViewer, classNameStrategies: { container: containerClassName } },
  'wix-draft-plugin-video': {
    component: VideoViewer,
    classNameStrategies: { container: containerClassName },
  },
});
