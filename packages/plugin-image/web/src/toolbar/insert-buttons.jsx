// @flow
import { TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../consts';
import { InsertPluginIcon } from '../icons';

const createInsertButtons /*: CreateInsertButtons */ = ({ t, settings }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.FILE,
      multi: true,
      name: 'ImagePlugin_InsertButton',
      tooltip: t('ImagePlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.EXTERNAL, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      getIcon: () => icon,
      componentData: DEFAULTS,
    },
  ];
};

export default createInsertButtons;
