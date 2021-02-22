import 'wix-rich-content-plugin-spoiler/dist/styles.min.css';
import { pluginSpoiler } from 'ricos/spoiler/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginSpoiler());
