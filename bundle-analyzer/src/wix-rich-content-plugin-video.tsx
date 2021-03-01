import { pluginVideo } from 'ricos/video/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginVideo());
