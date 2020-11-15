import React from 'react';
import { BUTTON_TYPES, FORMATTING_BUTTONS, EditorState } from 'wix-rich-content-editor-common';
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

const createToolbar: CreatePluginToolbar = ({
  t,
  getEditorState,
  setEditorState,
  isMobile,
  settings,
}: {
  t: TranslationFunction;
  getEditorState: GetEditorState;
  setEditorState: SetEditorState;
  isMobile: boolean;
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
            const newEditorState = EditorState.undo(getEditorState());
            if (isMobile && newEditorState.isInCompositionMode()) {
              // set isInComposition property of editorState to false forces draft to rerender
              newEditorState._immutable._map._root.nodes[3].entry[1] = false;
            }
            setEditorState(newEditorState);
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
            const newEditorState = EditorState.redo(getEditorState());
            if (isMobile && newEditorState.isInCompositionMode()) {
              // set isInComposition property of editorState to false forces draft to rerender
              newEditorState._immutable._map._root.nodes[3].entry[1] = false;
            }
            setEditorState(newEditorState);
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
