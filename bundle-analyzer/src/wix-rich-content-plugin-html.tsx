import 'wix-rich-content-plugin-html/dist/styles.min.css';
import { pluginHtml } from 'wix-rich-content-plugin-html/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginHtml());
