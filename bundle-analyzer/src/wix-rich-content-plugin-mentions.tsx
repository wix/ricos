import 'wix-rich-content-plugin-mentions/dist/styles.min.css';
import { mentionsTypeMapper } from 'wix-rich-content-plugin-mentions/dist/module.viewer.js';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(mentionsTypeMapper);
