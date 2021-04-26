import 'wix-rich-content-plugin-social-polls/dist/styles.min.css';
import { pluginPoll } from 'wix-rich-content-plugin-social-polls/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginPoll());
