import { TOOLBARS, INSERT_PLUGIN_BUTTONS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../file-upload-component';
import { InsertPluginIcon } from '../icons';
import { CreateInsertButtons, TranslationFunction } from 'wix-rich-content-common';
import { FilePluginEditorConfig } from '../types';

const createInsertButtons: CreateInsertButtons = ({
  settings,
  t,
}: {
  t: TranslationFunction;
  settings: FilePluginEditorConfig;
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.FILE,
      multi: true,
      name: INSERT_PLUGIN_BUTTONS.FILE,
      tooltip: t('FileUploadInsertButton_tooltip'),
      getIcon: () => icon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
    },
  ];
};

export default createInsertButtons;
