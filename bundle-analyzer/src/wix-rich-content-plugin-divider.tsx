import 'wix-rich-content-plugin-divider/dist/styles.min.css';
import { dividerTypeMapper } from 'ricos/divider/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(dividerTypeMapper);
