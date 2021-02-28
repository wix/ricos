import { pluginMentions } from 'ricos/mention/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginMentions());
