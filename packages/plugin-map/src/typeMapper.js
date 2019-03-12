import { MapViewer } from './MapViewer';
import { MAP_TYPE } from './constants';

export const typeMapper = () => ({
  [MAP_TYPE]: { component: MapViewer },
});
