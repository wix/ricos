import { TOOLBARS, BUTTON_TYPES, INSERT_PLUGIN_BUTTONS } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../consts';
import { InsertPluginIcon } from '../icons';
import { CreateInsertButtons, TranslationFunction, PluginConfig } from 'wix-rich-content-common';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
}: {
  t: TranslationFunction;
  settings: PluginConfig;
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.FILE,
      multi: true,
      name: INSERT_PLUGIN_BUTTONS.IMAGE,
      tooltip: t('ImagePlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      getIcon: () => icon,
      componentData: DEFAULTS,
    },
  ];
};

export default createInsertButtons;
