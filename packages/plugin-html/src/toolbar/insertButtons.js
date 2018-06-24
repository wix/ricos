import { DEFAULTS } from '../HtmlComponent';
import InsertPluginIcon from '../../statics/icons/insert-plugin.svg';

export default ({ helpers, t }) => {
  return [
    {
      name: 'HTML',
      tooltipText: t('HtmlPlugin_InsertButton_Tooltip'),
      Icon: InsertPluginIcon,
      data: DEFAULTS,
      helpers,
    },
  ];
};
