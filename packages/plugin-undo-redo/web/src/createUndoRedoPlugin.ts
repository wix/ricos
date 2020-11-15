import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { UNDO_REDO_TYPE, UndoRedoPluginEditorConfig } from './types';
import createToolbar from './createToolbar';
import { CreatePluginFunction } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';

const createUndoRedoPlugin: CreatePluginFunction<UndoRedoPluginEditorConfig> = config => {
  const type = UNDO_REDO_TYPE;
  const { helpers, theme, t, relValue, [type]: settings = {}, ...rest } = config;

  return createBasePlugin({
    settings,
    theme,
    type,
    relValue,
    toolbar: createToolbar(config),
    helpers,
    t,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

export { createUndoRedoPlugin };
