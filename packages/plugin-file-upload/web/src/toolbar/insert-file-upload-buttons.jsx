import { DEFAULTS } from '../file-upload-component';
import { TOOLBARS } from 'wix-rich-content-common';
import { InsertPluginIcon } from '../icons';
import { get } from 'lodash';

export default ({ helpers, settings, t }) => {
  const icon = get(settings, 'toolbar.icons.UploadFile');
  return [
    {
      type: 'file',
      name: 'UploadFile',
      tooltipText: t('FileUploadInsertButton_tooltip'),
      Icon: icon || InsertPluginIcon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      helpers,
      settings,
    },
  ];
};
