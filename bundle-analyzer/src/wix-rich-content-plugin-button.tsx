import 'wix-rich-content-plugin-button/dist/styles.min.css';
import { pluginLinkButton } from 'ricos/button/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginLinkButton());
