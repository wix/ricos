// @flow
import { Component as HtmlComponent } from './HtmlComponent';
//import { HTML_TYPE } from './types';

// if [HTML_TYPE] key is used, flow won't typecheck the value. See and upvote: https://github.com/facebook/flow/issues/4649
export const typeMapper /*: PluginTypeMapper*/ = () => ({
  'wix-draft-plugin-html': { component: HtmlComponent },
});
