import 'wix-rich-content-plugin-html/dist/styles.min.css';
import { htmlTypeMapper } from 'wix-rich-content-plugin-html/dist/module.viewer.cjs';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(htmlTypeMapper);
