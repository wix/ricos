import { EditorState } from 'wix-rich-content-editor-common';
import UndoIcon from './icons/UndoIcon';
import RedoIcon from './icons/RedoIcon';
import { UNDO_REDO_TYPE } from './types';
import createInsertButtons from './insert-buttons';

export default function createToolbar(config) {
  const TextButtonMapper = () => ({
    Undo: {
      externalizedButtonProps: {
        getLabel: () => '',
        isActive: () => false,
        isDisabled: () =>
          config
            .getEditorState()
            .getUndoStack()
            .isEmpty(),
        tooltip: config.t('UndoButton_Tooltip'),
        getIcon: () => config[UNDO_REDO_TYPE]?.toolbars?.icons?.Undo || UndoIcon,
        onClick: e => {
          e.preventDefault();
          config.setEditorState(EditorState.undo(config.getEditorState()));
        },
      },
      isMobile: true,
      isDesktop: false,
    },
    Redo: {
      externalizedButtonProps: {
        getLabel: () => '',
        isActive: () => false,
        isDisabled: () =>
          config
            .getEditorState()
            .getRedoStack()
            .isEmpty(),
        tooltip: config.t('RedoButton_Tooltip'),
        getIcon: () => config[UNDO_REDO_TYPE]?.toolbars?.icons?.Redo || RedoIcon,
        onClick: e => {
          e.preventDefault();
          config.setEditorState(EditorState.redo(config.getEditorState()));
        },
      },
      isMobile: true,
      isDesktop: false,
    },
  });
  return {
    TextButtonMapper,
    InsertButtons: createInsertButtons(config),
    name: 'undo-redo',
  };
}
