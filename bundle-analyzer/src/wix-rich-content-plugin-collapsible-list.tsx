import 'wix-rich-content-plugin-collapsible-list/dist/styles.min.css';
import { pluginCollapsibleList } from 'wix-rich-content-plugin-collapsible-list/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginCollapsibleList());
