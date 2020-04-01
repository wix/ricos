import { TOOLBARS } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../consts';
import { InsertPluginIcon } from '../icons';

export default ({ helpers, t, settings }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: 'file',
      multi: true,
      name: t('ImagePlugin_InsertButton'),
      tooltipText: t('ImagePlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: icon,
      componentData: DEFAULTS,
      helpers,
      t,
    },
  ];
};
