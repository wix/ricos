import { TOOLBARS, BUTTON_TYPES, INSERT_PLUGIN_BUTTONS } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../consts';
import { InsertPluginIcon } from '../icons';
import { CreateInsertButtons, TranslationFunction, UISettings } from 'wix-rich-content-common';
import { ImagePluginEditorConfig } from '../types';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
  uiSettings,
}: {
  t: TranslationFunction;
  settings: ImagePluginEditorConfig;
  uiSettings: UISettings;
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  const componentData =
    uiSettings.disableRightClick !== undefined
      ? { ...DEFAULTS, disableRightClick: uiSettings.disableRightClick }
      : DEFAULTS;
  return [
    {
      type: BUTTON_TYPES.FILE,
      multi: true,
      name: INSERT_PLUGIN_BUTTONS.IMAGE,
      tooltip: t('ImagePlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      getIcon: () => icon,
      componentData,
    },
  ];
};

export default createInsertButtons;
