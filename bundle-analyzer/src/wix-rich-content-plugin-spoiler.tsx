import 'wix-rich-content-plugin-spoiler/dist/styles.min.css';
import { pluginSpoiler } from 'wix-rich-content-plugin-spoiler/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginSpoiler());
