import { Component as HtmlComponent } from './HtmlComponent';
import { HTML_TYPE } from './types';
import { PluginTypeMapper } from 'wix-rich-content-common';
import { ComponentType } from 'react';

export const typeMapper: PluginTypeMapper = () => ({
  [HTML_TYPE]: { component: HtmlComponent as ComponentType },
});
