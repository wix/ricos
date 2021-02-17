import 'wix-rich-content-plugin-social-polls/dist/styles.min.css';
import { pollTypeMapper } from 'ricos/poll/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(pollTypeMapper);
