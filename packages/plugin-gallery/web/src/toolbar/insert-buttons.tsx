import { TOOLBARS, INSERT_PLUGIN_BUTTONS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../gallery-component';
import { InsertPluginIcon } from '../icons';
import { CreateInsertButtons, TranslationFunction } from 'wix-rich-content-common';
import { GalleryPluginEditorConfig } from '../types';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
  disableDownload,
  disableExpand,
}: {
  t: TranslationFunction;
  settings: GalleryPluginEditorConfig;
  disableDownload?: boolean;
  disableExpand?: boolean;
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  const pluginData = disableDownload !== undefined ? { ...DEFAULTS, disableDownload } : DEFAULTS;
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
