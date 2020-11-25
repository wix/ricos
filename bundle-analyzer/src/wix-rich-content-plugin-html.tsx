import 'wix-rich-content-plugin-html/dist/styles.min.css';
import { htmlTypeMapper } from 'wix-rich-content-plugin-html/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(htmlTypeMapper);
