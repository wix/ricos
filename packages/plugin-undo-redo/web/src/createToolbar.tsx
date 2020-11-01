import React from 'react';
import { BUTTON_TYPES, FORMATTING_BUTTONS } from 'wix-rich-content-editor-common';
import UndoIcon from './icons/UndoIcon';
import RedoIcon from './icons/RedoIcon';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';
import createInsertButtons from './insert-buttons';
import {
  Pubsub,
  CreatePluginToolbar,
  TranslationFunction,
  PluginConfig,
} from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  t,
  settings,
  commonPubsub,
}: {
  t: TranslationFunction;
  settings: PluginConfig;
  commonPubsub: Pubsub;
}) => {
  return {
    TextButtonMapper: (pubsub: Pubsub) => ({
      [FORMATTING_BUTTONS.UNDO]: {
        component: props => (
          <UndoButton commonPubsub={commonPubsub} pubsub={pubsub} t={t} {...props} />
        ),
        externalizedButtonProps: {
          type: BUTTON_TYPES.BUTTON,
          getLabel: () => '',
          isActive: () => false,
          isDisabled: () => commonPubsub.set('isUndoStackEmpty'),
          tooltip: t('UndoButton_Tooltip'),
          getIcon: () => settings?.toolbars?.icons?.Undo || UndoIcon,
          onClick: e => {
            commonPubsub.set('undo', e);
          },
        },
      },
      [FORMATTING_BUTTONS.REDO]: {
        component: props => (
          <RedoButton commonPubsub={commonPubsub} pubsub={pubsub} t={t} {...props} />
        ),
        externalizedButtonProps: {
          getLabel: () => '',
          type: BUTTON_TYPES.BUTTON,
          isActive: () => false,
          isDisabled: () => commonPubsub.set('isRedoStackEmpty'),
          tooltip: t('RedoButton_Tooltip'),
          getIcon: () => settings?.toolbars?.icons?.Redo || RedoIcon,
          onClick: e => {
            commonPubsub.set('redo', e);
          },
        },
      },
    }),
    InsertButtons: createInsertButtons({
      t,
      settings,
      commonPubsub,
    }),
    name: 'undo-redo',
  };
};

export default createToolbar;
