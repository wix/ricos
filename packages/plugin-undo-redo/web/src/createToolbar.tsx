import React from 'react';
import { BUTTON_TYPES, FORMATTING_BUTTONS, EditorState } from 'wix-rich-content-editor-common';
import UndoIcon from './icons/UndoIcon';
import RedoIcon from './icons/RedoIcon';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';
import { UNDO_REDO_TYPE } from './types';
import createInsertButtons from './insert-buttons';
import { Pubsub } from 'wix-rich-content-common';

export default function createToolbar(config) {
  const TextButtonMapper = (pubsub: Pubsub) => ({
    [FORMATTING_BUTTONS.UNDO]: {
      component: props => <UndoButton pubsub={pubsub} t={config.t} {...props} />,
      externalizedButtonProps: {
        type: BUTTON_TYPES.BUTTON,
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
    },
    [FORMATTING_BUTTONS.REDO]: {
      component: props => <RedoButton pubsub={pubsub} t={config.t} {...props} />,
      externalizedButtonProps: {
        getLabel: () => '',
        type: BUTTON_TYPES.BUTTON,
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
    },
  });
  return {
    TextButtonMapper,
    InsertButtons: createInsertButtons(config),
    name: 'undo-redo',
  };
}
