import 'wix-rich-content-plugin-divider/dist/styles.min.css';
import { pluginDivider } from 'wix-rich-content-plugin-divider/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginDivider());
