import { TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../file-upload-component';
import { InsertPluginIcon } from '../icons';

export default ({ settings, t }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.FILE,
      multi: true,
      name: 'UploadFilePlugin_InsertButton',
      tooltip: t('FileUploadInsertButton_tooltip'),
      getIcon: () => icon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.EXTERNAL, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
    },
  ];
};
