import { TOOLBARS } from 'wix-rich-content-editor-common';
import { defaults } from '../HtmlComponent';
import { InsertPluginIcon } from '../icons';

export default ({ helpers, t, settings }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      name: t('Mobile_HTMLCodePlugin_InsertButton'),
      tooltipText: t('HtmlPlugin_InsertButton_Tooltip'),
      Icon: icon,
      componentData: defaults(t),
      helpers,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
    },
  ];
};
