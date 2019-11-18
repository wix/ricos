import { get } from 'lodash';
import { TOOLBARS } from 'wix-rich-content-common';
import { getDefault } from '../consts';
import { InsertPluginIcon } from '../icons';

export default ({ helpers, t, settings }) => {
  const icon = get(settings, 'toolbar.icons.Image', InsertPluginIcon);
  return [
    {
      type: 'file',
      name: 'Image',
      tooltipText: t('ImagePlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: icon,
      componentData: getDefault(),
      helpers,
      t,
    },
  ];
};
