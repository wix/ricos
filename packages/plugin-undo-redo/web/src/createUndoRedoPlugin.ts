import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { UNDO_REDO_TYPE } from './types';
import createToolbar from './createToolbar';
import { CreatePluginFunction } from 'wix-rich-content-common';
import { EditorState } from 'draft-js';
import { DEFAULTS } from './defaults';

const createUndoRedoPlugin: CreatePluginFunction = config => {
  const type = UNDO_REDO_TYPE;
  const { helpers, theme, t, relValue, [type]: settings = {}, ...rest } = config;

  const onChange = (editorState: EditorState) => {
    if (plugin.pubsub) {
      plugin.pubsub.set('editorState', editorState);
    }
    return editorState;
  };

  const plugin = createBasePlugin(
    {
      settings,
      theme,
      type,
      relValue,
      toolbar: createToolbar(config),
      helpers,
      t,
      defaultPluginData: DEFAULTS,
      ...rest,
    },
    { onChange }
  );
  return plugin;
};

export { createUndoRedoPlugin };
