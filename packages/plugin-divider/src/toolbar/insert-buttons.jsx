import { InsertPluginIcon } from '../icons';
import { DEFAULTS } from '../constants';

export default ({ helpers, t }) => {
  return [
    {
      name: 'Divider',
      tooltipText: t('DividerPlugin_InsertButton_Tooltip'),
      Icon: InsertPluginIcon,
      data: DEFAULTS,
      helpers,
      t
    }
  ];
};
