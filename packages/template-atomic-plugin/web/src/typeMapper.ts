import YourPluginNameViewer from './yourDpluginDname-viewer';
import { YOUR_PLUGIN_NAME_TYPE } from './types';
import { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [YOUR_PLUGIN_NAME_TYPE]: { component: YourPluginNameViewer },
});
