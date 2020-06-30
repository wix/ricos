import { MapViewer } from './MapViewer';
import { MAP_TYPE } from './constants';

export const typeMapper: PluginTypeMapper = () => ({
  [MAP_TYPE]: { component: MapViewer },
});
