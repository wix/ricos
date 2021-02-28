import { pluginGiphy } from 'ricos/giphy/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginGiphy());
