import { TOOLBARS, BUTTON_TYPES, EditorState } from 'wix-rich-content-editor-common';
import UndoIcon from './icons/UndoIcon';
import RedoIcon from './icons/RedoIcon';

export default ({ helpers, t, settings, getEditorState, setEditorState }) => {
  const undoIcon = settings?.toolbar?.icons?.Undo || UndoIcon;
  const redoIcon = settings?.toolbar?.icons?.Redo || RedoIcon;
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: 'UndoPlugin_InsertButton',
      tooltip: t('UndoButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER],
      getIcon: () => undoIcon,
      componentData: {},
      helpers,
      t,
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
      name: 'RedoPlugin_InsertButton',
      tooltip: t('RedoButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER],
      getIcon: () => redoIcon,
      componentData: {},
      helpers,
      t,
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
