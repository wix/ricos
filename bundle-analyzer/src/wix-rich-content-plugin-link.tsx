import 'wix-rich-content-plugin-link/dist/styles.min.css';
import { pluginLink } from 'wix-rich-content-plugin-link/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginLink());
