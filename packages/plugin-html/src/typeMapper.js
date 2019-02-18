import { Component as HtmlComponent } from './HtmlComponent';
import { HTML_TYPE } from './types';

export const typeMapper = () => ({
  [HTML_TYPE]: { component: HtmlComponent },
});
