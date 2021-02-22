import 'wix-rich-content-plugin-map/dist/styles.min.css';
import { pluginMap } from 'ricos/map/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginMap());
