import 'wix-rich-content-plugin-hashtag/dist/styles.min.css';
import { HashtagDecorator } from 'ricos/hashtag/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(HashtagDecorator);
