import React from 'react';
import { BUTTON_TYPES, FORMATTING_BUTTONS } from 'wix-rich-content-editor-common';
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
} from 'wix-rich-content-common';
import { UndoRedoPluginEditorConfig } from './types';
import { undo, redo } from './utils';

const createToolbar: CreatePluginToolbar = ({
  t,
  getEditorState,
  setEditorState,
  settings,
}: {
  isMobile: boolean;
  t: TranslationFunction;
  getEditorState: GetEditorState;
  setEditorState: SetEditorState;
  settings: UndoRedoPluginEditorConfig;
}) => {
  return {
    TextButtonMapper: () => ({
      [FORMATTING_BUTTONS.UNDO]: {
        component: props => <UndoButton t={t} {...props} />,
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
            setEditorState(undo(getEditorState()));
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
    }),
    name: 'undo-redo',
  };
};

export default createToolbar;
