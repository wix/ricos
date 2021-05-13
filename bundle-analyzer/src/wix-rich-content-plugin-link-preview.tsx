import 'wix-rich-content-plugin-link-preview/dist/styles.min.css';
import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginLinkPreview());
