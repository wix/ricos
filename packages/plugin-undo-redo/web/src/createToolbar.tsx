import React from 'react';
import {
  BUTTON_TYPES,
  FORMATTING_BUTTONS,
  undo,
  redo,
  pluginsUndo,
} from 'wix-rich-content-editor-common';
import UndoIcon from './icons/UndoIcon';
import RedoIcon from './icons/RedoIcon';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';
import createInsertButtons from './insert-buttons';
import {
  CreatePluginToolbar,
  TranslationFunction,
  GetEditorState,
  SetEditorState,
  Pubsub,
} from 'wix-rich-content-common';
import { UndoRedoPluginEditorConfig } from './types';

const createToolbar: CreatePluginToolbar = ({
  t,
  getEditorState,
  setEditorState,
  settings,
  commonPubsub,
}: {
  t: TranslationFunction;
  getEditorState: GetEditorState;
  setEditorState: SetEditorState;
  settings: UndoRedoPluginEditorConfig;
  commonPubsub: Pubsub;
}) => {
  const isPluginExperiment = commonPubsub.get('undoExperiment')?.();
  return {
    TextButtonMapper: () => ({
      [FORMATTING_BUTTONS.UNDO]: {
        component: props => <UndoButton t={t} commonPubsub={commonPubsub} {...props} />,
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
            setEditorState(
              isPluginExperiment ? pluginsUndo(getEditorState()) : undo(getEditorState())
            );
          },
        },
      },
      [FORMATTING_BUTTONS.REDO]: {
        component: props => <RedoButton t={t} {...props} />,
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
            setEditorState(redo(getEditorState()));
          },
        },
      },
    }),
    InsertButtons: createInsertButtons({
      t,
      getEditorState,
      setEditorState,
      settings,
      isPluginExperiment,
    }),
    name: 'undo-redo',
  };
};

export default createToolbar;
