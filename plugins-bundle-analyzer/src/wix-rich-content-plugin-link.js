import 'wix-rich-content-plugin-link/dist/styles.min.css';
import { linkTypeMapper } from 'wix-rich-content-plugin-link/dist/module.viewer.cjs';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(linkTypeMapper);
