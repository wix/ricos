import 'wix-rich-content-plugin-hashtag/dist/styles.min.css';
import { HashtagDecorator } from 'wix-rich-content-plugin-hashtag/dist/module.viewer.js';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(HashtagDecorator);
