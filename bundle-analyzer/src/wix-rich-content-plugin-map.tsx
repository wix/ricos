import 'wix-rich-content-plugin-map/dist/styles.min.css';
import { pluginMap } from 'wix-rich-content-plugin-map/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginMap());
