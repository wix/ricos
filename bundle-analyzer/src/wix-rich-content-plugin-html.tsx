import 'wix-rich-content-plugin-html/dist/styles.min.css';
import { pluginHtml } from 'ricos/html/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginHtml());
