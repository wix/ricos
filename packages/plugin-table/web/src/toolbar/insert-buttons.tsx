import { DEFAULTS } from '../table-component';
import { TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import InsertPluginIcon from '../icons/InsertPluginIcon';
import { CreateInsertButtons, TranslationFunction } from 'wix-rich-content-common';
import { TablePluginEditorConfig } from '../types';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
}: {
  t: TranslationFunction;
  settings: TablePluginEditorConfig;
  isMobile: boolean;
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: 'table_InsertButton',
      getLabel: () => t('table_InsertButton'),
      tooltip: t('table_Tooltip'),
      getIcon: () => icon,
      isActive: () => false,
      isDisabled: () => false,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
    },
  ];
};
export default createInsertButtons;
