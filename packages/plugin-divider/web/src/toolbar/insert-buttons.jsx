import { TOOLBARS } from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import { DEFAULTS } from '../constants';

export default ({ helpers, t, settings }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      name: t('DividerPlugin_InsertButton'),
      tooltipText: t('DividerPlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: icon,
      componentData: DEFAULTS,
      helpers,
      t,
    },
  ];
};
