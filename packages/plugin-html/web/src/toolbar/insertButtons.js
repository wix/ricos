// @flow
import { TOOLBARS } from 'wix-rich-content-editor-common';
import { defaults } from '../HtmlComponent';
import { InsertPluginIcon } from '../icons';

const createInsertButtons /*: CreateInsertButtons */ = ({ helpers, t, settings }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      name: 'HTMLCodePlugin_InsertButton',
      tooltipText: t('HtmlPlugin_InsertButton_Tooltip'),
      Icon: icon,
      componentData: defaults(t),
      helpers,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
    },
  ];
};

export default createInsertButtons;
