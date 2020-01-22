import 'wix-rich-content-plugin-html/dist/styles.min.css';
import { buttonTypeMapper } from 'wix-rich-content-plugin-html/dist/module.viewer.cjs';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(buttonTypeMapper);
