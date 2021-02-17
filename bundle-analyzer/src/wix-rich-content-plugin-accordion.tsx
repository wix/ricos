import 'wix-rich-content-plugin-accordion/dist/styles.min.css';
import { accordionTypeMapper } from 'ricos/accordion/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(accordionTypeMapper);
