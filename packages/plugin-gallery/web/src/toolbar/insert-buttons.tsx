import { TOOLBARS, INSERT_PLUGIN_BUTTONS, BUTTON_TYPES } from 'wix-rich-content-plugin-commons';
import { DEFAULTS } from '../gallery-component';
import { InsertPluginIcon } from '../icons';
import { CreateInsertButtons } from 'wix-rich-content-common';

const createInsertButtons: CreateInsertButtons<'t' | 'settings'> = ({ t, settings }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.FILE,
      multi: true,
      name: INSERT_PLUGIN_BUTTONS.GALLERY,
      tooltip: t('GalleryPlugin_InsertButton_Tooltip'),
      getIcon: () => icon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
    },
  ];
};

export default createInsertButtons;
