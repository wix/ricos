import 'wix-rich-content-plugin-code-block/dist/styles.min.css';
import { CodeBlockDecorator } from 'wix-rich-content-plugin-code-block/dist/module.viewer.cjs';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(CodeBlockDecorator);
