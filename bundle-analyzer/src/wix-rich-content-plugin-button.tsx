import 'wix-rich-content-plugin-button/dist/styles.min.css';
import { pluginLinkButton } from 'wix-rich-content-plugin-button/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginLinkButton());
