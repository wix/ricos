// @flow
import { TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { defaults } from '../HtmlComponent';
import { InsertPluginIcon } from '../icons';

const createInsertButtons /*: CreateInsertButtons */ = ({ t, settings }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: 'HTMLCodePlugin_InsertButton',
      tooltip: t('HtmlPlugin_InsertButton_Tooltip'),
      getIcon: () => icon,
      componentData: defaults(t),
      toolbars: [TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
    },
  ];
};

export default createInsertButtons;
