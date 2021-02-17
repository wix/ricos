import 'wix-rich-content-plugin-link/dist/styles.min.css';
import { linkTypeMapper } from 'ricos/link/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(linkTypeMapper);
