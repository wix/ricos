// @flow
import SpoilerViewer from './spoiler-viewer';
import { SPOILER_TYPE } from './types';

// if [SPOILER_TYPE] key is used, flow won't typecheck the value. See and upvote: https://github.com/facebook/flow/issues/4649
export const typeMapper /*: PluginTypeMapper*/ = () => ({
  [SPOILER_TYPE]: { component: SpoilerViewer, elementType: 'inline' },
});
