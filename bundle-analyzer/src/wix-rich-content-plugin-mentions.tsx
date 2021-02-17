import 'wix-rich-content-plugin-mentions/dist/styles.min.css';
import { mentionsTypeMapper } from 'ricos/mention/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(mentionsTypeMapper);
