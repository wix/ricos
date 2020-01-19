import 'wix-rich-content-plugin-mentions/dist/styles.min.css';
import { mentionsTypeMapper } from 'wix-rich-content-plugin-mentions/dist/module.viewer.cjs';
import createViewerBundle from './wrapper';

export default () => createViewerBundle(mentionsTypeMapper);
