import 'wix-rich-content-plugin-file-upload/dist/styles.min.css';
import { pluginFileUpload } from 'ricos/file/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginFileUpload());
