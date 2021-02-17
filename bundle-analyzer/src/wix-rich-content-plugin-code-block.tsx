import 'wix-rich-content-plugin-code-block/dist/styles.min.css';
import { CodeBlockDecorator } from 'ricos/code-block/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(CodeBlockDecorator);
