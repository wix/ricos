import { getDefault } from './../image-component';
import { InsertPluginIcon } from '../icons';

export default ({ helpers, t }) => {
  return [
    {
      type: 'file',
      name: 'Image',
      tooltipText: t('ImagePlugin_InsertButton_Tooltip'),
      Icon: InsertPluginIcon,
      componentData: getDefault(),
      helpers,
      t,
    },
  ];
};
