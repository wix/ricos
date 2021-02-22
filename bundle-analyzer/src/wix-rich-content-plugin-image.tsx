import 'wix-rich-content-plugin-image/dist/styles.min.css';
import { pluginImage } from 'ricos/image/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginImage());
