import { TOOLBARS, BUTTON_TYPES, EditorState } from 'wix-rich-content-editor-common';
import UndoIcon from './icons/UndoIcon';
import RedoIcon from './icons/RedoIcon';

export default ({ helpers, t, settings }) => {
  const undoIcon = settings?.toolbar?.icons?.Undo || UndoIcon;
  const redoIcon = settings?.toolbar?.icons?.Redo || RedoIcon;
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: 'UndoPlugin_InsertButton',
      tooltipText: t('UndoButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER],
      Icon: undoIcon,
      componentData: {},
      helpers,
      t,
      mapStoreDataToButtonProps: ({ getEditorState, setEditorState }) => ({
        onClick: e => {
          e.preventDefault();
          setEditorState(EditorState.undo(getEditorState()));
        },
        isDisabled: () =>
          getEditorState()
            .getUndoStack()
            .isEmpty(),
      }),
    },
    {
      type: BUTTON_TYPES.BUTTON,
      name: 'RedoPlugin_InsertButton',
      tooltipText: t('RedoButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER],
      Icon: redoIcon,
      componentData: {},
      helpers,
      t,
      mapStoreDataToButtonProps: ({ getEditorState, setEditorState }) => ({
        onClick: e => {
          e.preventDefault();
          setEditorState(EditorState.redo(getEditorState()));
        },
        isDisabled: () =>
          getEditorState()
            .getRedoStack()
            .isEmpty(),
      }),
    },
  ];
};
