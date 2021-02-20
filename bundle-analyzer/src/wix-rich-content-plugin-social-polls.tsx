import 'wix-rich-content-plugin-social-polls/dist/styles.min.css';
import { pollTypeMapper } from 'wix-rich-content-plugin-social-polls/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(pollTypeMapper);
