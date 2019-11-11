import { TOOLBARS } from 'wix-rich-content-common';
import { DEFAULTS } from '../HtmlComponent';
import { InsertPluginIcon } from '../icons';
import { get } from 'lodash';

export default ({ helpers, t, settings }) => {
  const icon = get(settings, 'toolbar.icons.HTML');
  return [
    {
      name: 'HTML',
      tooltipText: t('HtmlPlugin_InsertButton_Tooltip'),
      Icon: icon || InsertPluginIcon,
      componentData: DEFAULTS,
      helpers,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
    },
  ];
};
