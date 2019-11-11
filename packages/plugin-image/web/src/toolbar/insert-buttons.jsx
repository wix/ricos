import { TOOLBARS } from 'wix-rich-content-common';
import { getDefault } from '../consts';
import { InsertPluginIcon } from '../icons';
import { get } from 'lodash';

export default ({ helpers, t, settings }) => {
  const icon = get(settings, 'toolbar.icons.Image');
  return [
    {
      type: 'file',
      name: 'Image',
      tooltipText: t('ImagePlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: icon || InsertPluginIcon,
      componentData: getDefault(),
      helpers,
      t,
    },
  ];
};
