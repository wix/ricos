import 'wix-rich-content-plugin-code-block/dist/styles.min.css';
import { pluginCodeBlock } from 'wix-rich-content-plugin-code-block/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginCodeBlock());
