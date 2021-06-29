import { DEFAULTS } from '../collapsible-list-component';
import { TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import InsertPluginIcon from '../icons/InsertPluginIcon';
import { CreateInsertButtons, TranslationFunction } from 'wix-rich-content-common';
import { CollapsibleListPluginEditorConfig } from '../types';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
}: {
  t: TranslationFunction;
  settings: CollapsibleListPluginEditorConfig;
  isMobile: boolean;
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: 'CollapsibleList_InsertButton',
      getLabel: () => t('CollapsibleList_InsertButton'),
      tooltip: t('CollapsibleListPlugin_InsertButton_Tooltip'),
      getIcon: () => icon,
      isActive: () => false,
      isDisabled: () => false,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      section: 'BlockToolbar_Section_Advanced',
    },
  ];
};
export default createInsertButtons;
