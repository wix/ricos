import 'wix-rich-content-plugin-table/dist/styles.min.css';
import { pluginTable } from 'wix-rich-content-plugin-table/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginTable());
