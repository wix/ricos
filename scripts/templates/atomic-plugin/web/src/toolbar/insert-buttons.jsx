import { DEFAULTS } from '../yourDpluginDname-component';
import { TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';

export default ({ helpers, settings }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: 'yourPluginName',
      tooltipText: 'yourPluginName new plugin!',
      Icon: icon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      helpers,
    },
  ];
};
