import { TOOLBARS } from 'wix-rich-content-common';
import { getDefault } from './../gallery-component';
import { InsertPluginIcon } from '../icons';
import { get } from 'lodash';

export default ({ helpers, t, settings }) => {
  const icon = get(settings, 'toolbar.icons.Gallery');
  return [
    {
      type: 'file',
      multi: true,
      name: 'Gallery',
      tooltipText: t('GalleryPlugin_InsertButton_Tooltip'),
      Icon: icon || InsertPluginIcon,
      componentData: getDefault(),
      helpers,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
    },
  ];
};
