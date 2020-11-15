import GiphyViewer from './giphy-viewer';
import { GIPHY_TYPE } from './types';
import { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [GIPHY_TYPE]: { component: GiphyViewer },
});
