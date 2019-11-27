import { get } from 'lodash';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import { DEFAULTS } from '../constants';

export default ({ helpers, t, settings }) => {
  const icon = get(settings, 'toolbar.icons.Divider', InsertPluginIcon);
  return [
    {
      name: 'Divider',
      tooltipText: t('DividerPlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: icon,
      componentData: DEFAULTS,
      helpers,
      t,
    },
  ];
};
