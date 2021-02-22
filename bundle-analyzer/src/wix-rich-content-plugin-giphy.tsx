import 'wix-rich-content-plugin-giphy/dist/styles.min.css';
import { pluginGiphy } from 'ricos/giphy/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginGiphy());
