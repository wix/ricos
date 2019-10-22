import { DEFAULTS } from '../file-upload-component';
import { TOOLBARS } from 'wix-rich-content-common';
import { InsertPluginIcon } from '../icons';

export default ({ helpers, settings, t }) => {
  return [
    {
      type: 'file',
      name: 'UploadFile',
      tooltipText: t('FileUploadInsertButton_tooltip'),
      Icon: InsertPluginIcon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      helpers,
      settings,
    },
  ];
};
