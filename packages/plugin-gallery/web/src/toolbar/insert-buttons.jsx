import { get } from 'lodash';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import { getDefault } from './../gallery-component';
import { InsertPluginIcon } from '../icons';

export default ({ helpers, t, settings }) => {
  const icon = get(settings, 'toolbar.icons.Gallery', InsertPluginIcon);
  return [
    {
      type: 'file',
      multi: true,
      name: 'Gallery',
      tooltipText: t('GalleryPlugin_InsertButton_Tooltip'),
      Icon: icon,
      componentData: getDefault(),
      helpers,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
    },
  ];
};
