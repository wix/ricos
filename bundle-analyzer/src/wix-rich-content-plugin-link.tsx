import 'wix-rich-content-plugin-link/dist/styles.min.css';
import { pluginLink } from 'ricos/link/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginLink());
