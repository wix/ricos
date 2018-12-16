import { TOOLBARS } from 'wix-rich-content-common';
import { InsertPluginIcon } from '../icons';
import { DEFAULTS } from '../constants';

export default ({ helpers, t }) => {
  return [
    {
      name: 'Map',
      tooltipText: t('MapPlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: InsertPluginIcon,
      componentData: DEFAULTS,
      helpers,
      t
    }
  ];
};
