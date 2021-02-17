import 'wix-rich-content-plugin-file-upload/dist/styles.min.css';
import { fileUploadTypeMapper } from 'ricos/file/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(fileUploadTypeMapper);
