import { DEFAULTS } from '../yourPluginName-component';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';

export default ({ helpers, settings }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      name: 'yourPluginName',
      tooltipText: 'yourPluginName new plugin!',
      Icon: icon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      helpers,
    },
  ];
};
