import YourPluginNameViewer from './yourPluginName-viewer';
import { YOUR_PLUGIN_NAME_TYPE } from './types';

export const typeMapper = () => ({
  [YOUR_PLUGIN_NAME_TYPE]: { component: YourPluginNameViewer },
});
