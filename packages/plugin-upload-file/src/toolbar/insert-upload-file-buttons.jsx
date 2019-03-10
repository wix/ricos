import { DEFAULTS } from '../upload-file-component';
import { TOOLBARS } from 'wix-rich-content-common';
import { InsertPluginIcon } from '../icons';

export default ({ helpers, t, settings }) => {
  return [
    {
      type: 'file',
      name: 'UploadFile',
      tooltipText: t('UploadFileInsertButton_tooltip'),
      Icon: InsertPluginIcon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      helpers,
      settings
    }
  ];
};
