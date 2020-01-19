import 'wix-rich-content-plugin-hashtag/dist/styles.min.css';
import { HashtagDecorator } from 'wix-rich-content-plugin-hashtag/dist/module.viewer.cjs';
import createViewerBundle from './wrapper';

export default () => createViewerBundle(HashtagDecorator);
