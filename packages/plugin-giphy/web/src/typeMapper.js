import GiphyViewer from './giphy-viewer';
import { GIPHY_TYPE } from './constants';

export const typeMapper = () => ({
  [GIPHY_TYPE]: { component: GiphyViewer },
});
