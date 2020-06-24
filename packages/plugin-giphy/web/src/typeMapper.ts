import GiphyViewer from './giphy-viewer';
import { GIPHY_TYPE } from './constants';

export const typeMapper: PluginTypeMapper = () => ({
  [GIPHY_TYPE]: { component: GiphyViewer },
});
