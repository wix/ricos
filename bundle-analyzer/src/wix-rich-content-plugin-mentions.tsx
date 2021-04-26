import 'wix-rich-content-plugin-mentions/dist/styles.min.css';
import { pluginMentions } from 'wix-rich-content-plugin-mentions/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginMentions());
