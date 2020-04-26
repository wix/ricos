// @flow
import DividerComponent from './components/divider-component';
//import { DIVIDER_TYPE } from './constants';

// if [DIVIDER_TYPE] key is used, flow won't typecheck the value. See and upvote: https://github.com/facebook/flow/issues/4649
export const typeMapper /*: PluginTypeMapper*/ = () => ({
  'wix-draft-plugin-divider': { component: DividerComponent },
});
