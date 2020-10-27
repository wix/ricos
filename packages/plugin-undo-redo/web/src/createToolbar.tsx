import React from 'react';
import { BUTTON_TYPES, FORMATTING_BUTTONS, EditorState } from 'wix-rich-content-editor-common';
import UndoIcon from './icons/UndoIcon';
import RedoIcon from './icons/RedoIcon';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';
import createInsertButtons from './insert-buttons';
import {
  Pubsub,
  CreatePluginToolbar,
  TranslationFunction,
  GetEditorState,
  SetEditorState,
  PluginConfig,
} from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  t,
  getEditorState,
  setEditorState,
  settings,
}: {
  t: TranslationFunction;
  getEditorState: GetEditorState;
  setEditorState: SetEditorState;
  settings: PluginConfig;
}) => {
  return {
    TextButtonMapper: (pubsub: Pubsub) => ({
      [FORMATTING_BUTTONS.UNDO]: {
        component: props => <UndoButton pubsub={pubsub} t={t} {...props} />,
        externalizedButtonProps: {
          type: BUTTON_TYPES.BUTTON,
          getLabel: () => '',
          isActive: () => false,
          isDisabled: () =>
            getEditorState()
              .getUndoStack()
              .isEmpty(),
          tooltip: t('UndoButton_Tooltip'),
          getIcon: () => settings?.toolbars?.icons?.Undo || UndoIcon,
          onClick: e => {
            e.preventDefault();
            setEditorState(EditorState.undo(getEditorState()));
          },
        },
      },
      [FORMATTING_BUTTONS.REDO]: {
        component: props => <RedoButton pubsub={pubsub} t={t} {...props} />,
        externalizedButtonProps: {
          getLabel: () => '',
          type: BUTTON_TYPES.BUTTON,
          isActive: () => false,
          isDisabled: () =>
            getEditorState()
              .getRedoStack()
              .isEmpty(),
          tooltip: t('RedoButton_Tooltip'),
          getIcon: () => settings?.toolbars?.icons?.Redo || RedoIcon,
          onClick: e => {
            e.preventDefault();
            setEditorState(EditorState.redo(getEditorState()));
          },
        },
      },
    }),
    InsertButtons: createInsertButtons({
      t,
      getEditorState,
      setEditorState,
      settings,
    }),
    name: 'undo-redo',
  };
};

export default createToolbar;
