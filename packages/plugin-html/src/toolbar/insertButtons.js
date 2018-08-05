import { DEFAULTS } from '../HtmlComponent';
import { InsertPluginIcon } from '../icons';

export default ({ helpers, t }) => {
  return [
    {
      name: 'HTML',
      tooltipText: t('HtmlPlugin_InsertButton_Tooltip'),
      Icon: InsertPluginIcon,
      componentData: DEFAULTS,
      helpers,
    },
  ];
};
