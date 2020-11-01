import { TOOLBARS, INSERT_PLUGIN_BUTTONS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import UndoIcon from './icons/UndoIcon';
import RedoIcon from './icons/RedoIcon';
import {
  CreateInsertButtons,
  TranslationFunction,
  PluginConfig,
  Pubsub,
} from 'wix-rich-content-common';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
  commonPubsub,
}: {
  t: TranslationFunction;
  settings: PluginConfig;
  commonPubsub: Pubsub;
}) => {
  const undoIcon = settings?.toolbar?.icons?.Undo || UndoIcon;
  const redoIcon = settings?.toolbar?.icons?.Redo || RedoIcon;
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: INSERT_PLUGIN_BUTTONS.UNDO,
      tooltip: t('UndoButton_Tooltip'),
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.FOOTER],
      getIcon: () => undoIcon,
      componentData: {},
      onClick: e => {
        commonPubsub.set('undo', e);
      },
      isDisabled: () => commonPubsub.set('isUndoStackEmpty'),
    },
    {
      type: BUTTON_TYPES.BUTTON,
      name: INSERT_PLUGIN_BUTTONS.REDO,
      tooltip: t('RedoButton_Tooltip'),
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.FOOTER],
      getIcon: () => redoIcon,
      componentData: {},
      onClick: e => {
        commonPubsub.set('redo', e);
      },
      isDisabled: () => commonPubsub.set('isRedoStackEmpty'),
    },
  ];
};

export default createInsertButtons;
