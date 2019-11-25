import { get } from 'lodash';
import { TOOLBARS } from 'wix-rich-content-common';
import { DEFAULTS } from '../file-upload-component';
import { InsertPluginIcon } from '../icons';

export default ({ helpers, settings, t }) => {
  const icon = get(settings, 'toolbar.icons.UploadFile', InsertPluginIcon);
  return [
    {
      type: 'file',
      name: 'UploadFile',
      tooltipText: t('FileUploadInsertButton_tooltip'),
      Icon: icon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      helpers,
      settings,
    },
  ];
};
