// @flow
//import { EXTERNAL_LINK_TYPE, LINK_TYPE } from './types';
import LinkViewer from './LinkViewer';

// if [LINK_TYPE] key is used, flow won't typecheck the value. See and upvote: https://github.com/facebook/flow/issues/4649
export const typeMapper /*: PluginTypeMapper*/ = () => ({
  'wix-draft-plugin-external-link': { component: LinkViewer, elementType: 'inline' },
  LINK: { component: LinkViewer, elementType: 'inline' },
});
