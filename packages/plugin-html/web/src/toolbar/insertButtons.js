import { get } from 'lodash';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../HtmlComponent';
import { InsertPluginIcon } from '../icons';

export default ({ helpers, t, settings }) => {
  const icon = get(settings, 'toolbar.icons.HTML', InsertPluginIcon);
  return [
    {
      name: 'HTML',
      tooltipText: t('HtmlPlugin_InsertButton_Tooltip'),
      Icon: icon,
      componentData: DEFAULTS,
      helpers,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
    },
  ];
};
