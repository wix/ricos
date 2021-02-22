import 'wix-rich-content-plugin-mentions/dist/styles.min.css';
import { pluginMentions } from 'ricos/mention/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginMentions());
