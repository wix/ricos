import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css';
import { pluginSoundCloud } from 'ricos/sound-cloud/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginSoundCloud());
