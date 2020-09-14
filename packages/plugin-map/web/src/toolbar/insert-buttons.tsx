import { TOOLBARS, INSERT_PLUGIN_BUTTONS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import InsertPluginIcon from '../icons/InsertPluginIcon';
import { DEFAULTS } from '../defaults';
import { CreateInsertButtons } from 'wix-rich-content-common';

const createInsertButtons: CreateInsertButtons<'t' | 'settings'> = ({ t, settings }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: INSERT_PLUGIN_BUTTONS.MAP,
      tooltip: t('MapPlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      getIcon: () => icon,
      componentData: {
        config: {
          size: settings.size || DEFAULTS.size,
          alignment: settings.alignment || DEFAULTS.alignment,
          width: settings.width || DEFAULTS.width,
          height: settings.height || DEFAULTS.height,
        },
        mapSettings: settings.mapSettings,
      },
    },
  ];
};

export default createInsertButtons;
