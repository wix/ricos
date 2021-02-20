import 'wix-rich-content-plugin-link/dist/styles.min.css';
import { linkTypeMapper } from 'wix-rich-content-plugin-link/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(linkTypeMapper);
