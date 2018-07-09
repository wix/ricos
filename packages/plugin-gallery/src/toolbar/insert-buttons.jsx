import { getDefault } from './../gallery-component';
import InsertPluginIcon from './../icons/insert-plugin.svg';

export default ({ helpers, t }) => {
  return [
    {
      type: 'file',
      multi: true,
      name: 'Gallery',
      tooltipText: t('GalleryPlugin_InsertButton_Tooltip'),
      Icon: InsertPluginIcon,
      data: getDefault(),
      helpers,
    },
  ];
};
