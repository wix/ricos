import { pluginUndoRedo } from 'ricos/undo-redo/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginUndoRedo());
