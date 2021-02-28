import { pluginSoundCloud } from 'ricos/sound-cloud/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginSoundCloud());
