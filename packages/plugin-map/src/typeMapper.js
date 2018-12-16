import MapViewer from './map-viewer';
import { MAP_TYPE } from './constants';

export const typeMapper = () => ({
  [MAP_TYPE]: { component: MapViewer }
});
