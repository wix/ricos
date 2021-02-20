import InsertPluginIcon from '../icons/InsertPluginIcon';
import { DEFAULTS } from '../defaults';
import { TOOLBARS, BUTTON_TYPES, INSERT_PLUGIN_BUTTONS } from 'wix-rich-content-editor-common';
import { CreateInsertButtons } from 'wix-rich-content-common';
import { TranslationFunction } from 'react-i18next';
import { DividerPluginEditorConfig } from '../types';

export const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
}: {
  t: TranslationFunction;
  settings: DividerPluginEditorConfig;
  styles: Record<string, string>;
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: INSERT_PLUGIN_BUTTONS.DIVIDER,
      tooltip: t('DividerPlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      getIcon: () => icon,
      componentData: DEFAULTS,
    },
  ];
};
