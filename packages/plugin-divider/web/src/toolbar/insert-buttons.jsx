// @flow
import { InsertPluginIcon } from '../icons';
import { DEFAULTS } from '../constants';
import { TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';

export const createInsertButtons /*: CreateInsertButtons */ = ({ helpers, t, settings }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: 'DividerPlugin_InsertButton',
      tooltipText: t('DividerPlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: icon,
      componentData: DEFAULTS,
      helpers,
      t,
    },
  ];
};
