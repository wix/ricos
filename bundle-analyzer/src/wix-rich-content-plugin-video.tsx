import 'wix-rich-content-plugin-video/dist/styles.min.css';
import { pluginVideo } from 'ricos/video/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginVideo());
