import 'wix-rich-content-plugin-spoiler/dist/styles.min.css';
import { spoilerInlineStyleMapper } from 'ricos/spoiler/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(spoilerInlineStyleMapper);
