import GiphyViewer from './giphy-viewer';
import { GIPHY_TYPE } from './types';
import { containerClassName } from './classNameStrategies';

export const typeMapper = () => ({
  [GIPHY_TYPE]: { component: GiphyViewer, classNameStrategies: { container: containerClassName } },
});
