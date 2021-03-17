import { TOOLBARS, INSERT_PLUGIN_BUTTONS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../gallery-component';
import { InsertPluginIcon } from '../icons';
import { CreateInsertButtons, TranslationFunction } from 'wix-rich-content-common';
import { GalleryPluginEditorConfig } from '../types';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
  disableRightClick,
  disableExpand,
}: {
  t: TranslationFunction;
  settings: GalleryPluginEditorConfig;
  disableRightClick: boolean | undefined;
  disableExpand: boolean | undefined;
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  const pluginData =
    disableRightClick !== undefined ? { ...DEFAULTS, disableRightClick } : DEFAULTS;
  const componentData = disableExpand !== undefined ? { ...pluginData, disableExpand } : pluginData;

  return [
    {
      type: BUTTON_TYPES.FILE,
      multi: true,
      name: INSERT_PLUGIN_BUTTONS.GALLERY,
      tooltip: t('GalleryPlugin_InsertButton_Tooltip'),
      getIcon: () => icon,
      componentData,
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
    },
  ];
};

export default createInsertButtons;
