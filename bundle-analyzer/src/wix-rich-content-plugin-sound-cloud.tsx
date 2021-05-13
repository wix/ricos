import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css';
import { pluginSoundCloud } from 'wix-rich-content-plugin-sound-cloud/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginSoundCloud());
