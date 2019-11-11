import { TOOLBARS } from 'wix-rich-content-common';
import { InsertPluginIcon } from '../icons';
import { DEFAULTS } from '../constants';
import { get } from 'lodash';

export default ({ helpers, t, settings }) => {
  const icon = get(settings, 'toolbar.icons.Button');
  return [
    {
      name: 'Button',
      tooltipText: t('ButtonPlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: icon || InsertPluginIcon,
      componentData: DEFAULTS,
      helpers,
      t,
    },
  ];
};
