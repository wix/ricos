import 'wix-rich-content-plugin-image/dist/styles.min.css';
import { pluginImage } from 'wix-rich-content-plugin-image/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginImage());
