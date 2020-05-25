import { TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../file-upload-component';
import { InsertPluginIcon } from '../icons';

export default ({ helpers, settings, t }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.FILE,
      multi: true,
      name: 'UploadFilePlugin_InsertButton',
      tooltipText: t('FileUploadInsertButton_tooltip'),
      Icon: icon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      helpers,
      settings,
    },
  ];
};
