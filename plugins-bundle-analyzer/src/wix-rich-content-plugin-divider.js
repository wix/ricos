import 'wix-rich-content-plugin-divider/dist/styles.min.css';
import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/dist/module.viewer.cjs';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(dividerTypeMapper);
