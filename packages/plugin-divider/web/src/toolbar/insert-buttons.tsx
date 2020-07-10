import { InsertPluginIcon } from '../icons';
import { DEFAULTS } from '../constants';
import { TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { CreateInsertButtons } from 'wix-rich-content-common';

export const createInsertButtons: CreateInsertButtons<'t' | 'settings'> = ({ t, settings }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: 'DividerPlugin_InsertButton',
      tooltip: t('DividerPlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.EXTERNAL, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      getIcon: () => icon,
      componentData: DEFAULTS,
    },
  ];
};
