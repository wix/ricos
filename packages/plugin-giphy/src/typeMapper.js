import GiphyViewer from './giphy-viewer';
import { GIPHY_TYPE } from './constants';
import { containerClassName } from './classNameStrategies';

export const typeMapper = () => ({
  [GIPHY_TYPE]: { component: GiphyViewer, classNameStrategies: { container: containerClassName } },
});
