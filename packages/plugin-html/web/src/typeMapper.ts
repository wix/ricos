import { Component as HtmlComponent } from './HtmlComponent';
import { HTML_TYPE } from './types';

export const typeMapper: PluginTypeMapper = () => ({
  [HTML_TYPE]: { component: HtmlComponent as ReactComponentType },
});
