import 'wix-rich-content-plugin-giphy/dist/styles.min.css';
import { pluginGiphy } from 'wix-rich-content-plugin-giphy/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginGiphy());
