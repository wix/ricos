import { TOOLBARS } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../file-upload-component';
import { InsertPluginIcon } from '../icons';

const createInsertButtons: CreateInsertButtons<'helpers' | 'settings' | 't' | 'settings'> = ({
  helpers,
  settings,
  t,
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: 'file',
      multi: true,
      name: 'UploadFilePlugin_InsertButton',
      tooltipText: t('FileUploadInsertButton_tooltip'),
      Icon: icon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE] as ToolbarType[],
      helpers,
      settings,
    },
  ];
};

export default createInsertButtons;
