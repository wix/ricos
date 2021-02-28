import { pluginFileUpload } from 'ricos/file/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginFileUpload());
