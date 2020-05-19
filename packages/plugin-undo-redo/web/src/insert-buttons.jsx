import { TOOLBARS, EditorState } from 'wix-rich-content-editor-common';
import UndoIcon from './icons/UndoIcon';
import RedoIcon from './icons/RedoIcon';

export default ({ helpers, t, settings, UndoButton, RedoButton }) => {
  const undoIcon = settings?.toolbar?.icons?.Undo || UndoIcon;
  const redoIcon = settings?.toolbar?.icons?.Redo || RedoIcon;
  return [
    {
      type: 'undo-redo',
      name: 'UndoPlugin_InsertButton',
      tooltipText: t('Undo Button'),
      toolbars: [TOOLBARS.FOOTER],
      Icon: undoIcon,
      componentData: {},
      wrappingComponent: UndoButton,
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
      type: 'undo-redo',
      name: 'RedoPlugin_InsertButton',
      tooltipText: t('Redo Button'),
      toolbars: [TOOLBARS.FOOTER],
      Icon: redoIcon,
      componentData: {},
      wrappingComponent: RedoButton,
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
