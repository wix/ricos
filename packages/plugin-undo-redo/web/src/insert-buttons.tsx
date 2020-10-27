import {
  TOOLBARS,
  INSERT_PLUGIN_BUTTONS,
  BUTTON_TYPES,
  EditorState,
} from 'wix-rich-content-editor-common';
import UndoIcon from './icons/UndoIcon';
import RedoIcon from './icons/RedoIcon';
import {
  CreateInsertButtons,
  TranslationFunction,
  GetEditorState,
  SetEditorState,
  PluginConfig,
} from 'wix-rich-content-common';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
  getEditorState,
  setEditorState,
}: {
  t: TranslationFunction;
  getEditorState: GetEditorState;
  setEditorState: SetEditorState;
  settings: PluginConfig;
}) => {
  const undoIcon = settings?.toolbar?.icons?.Undo || UndoIcon;
  const redoIcon = settings?.toolbar?.icons?.Redo || RedoIcon;
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: INSERT_PLUGIN_BUTTONS.UNDO,
      tooltip: t('UndoButton_Tooltip'),
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.FOOTER],
      getIcon: () => undoIcon,
      componentData: {},
      onClick: e => {
        e.preventDefault();
        setEditorState(EditorState.undo(getEditorState()));
      },
      isDisabled: () =>
        getEditorState()
          .getUndoStack()
          .isEmpty(),
    },
    {
      type: BUTTON_TYPES.BUTTON,
      name: INSERT_PLUGIN_BUTTONS.REDO,
      tooltip: t('RedoButton_Tooltip'),
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.FOOTER],
      getIcon: () => redoIcon,
      componentData: {},
      onClick: e => {
        e.preventDefault();
        setEditorState(EditorState.redo(getEditorState()));
      },
      isDisabled: () =>
        getEditorState()
          .getRedoStack()
          .isEmpty(),
    },
  ];
};

export default createInsertButtons;
