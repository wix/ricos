import 'wix-rich-content-plugin-text-color/dist/styles.min.css';
import { pluginTextColor, pluginTextHighlight } from 'ricos/text-color/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle([pluginTextColor(), pluginTextHighlight()]);
