import { DEFAULTS } from '../collapsible-list-component';
import { TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import InsertPluginIcon from '../icons/InsertPluginIcon';
import { CreateInsertButtons, TranslationFunction, isRtl } from 'wix-rich-content-common';
import { CollapsibleListPluginEditorConfig } from '../types';
import { directions } from '../defaults';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
  locale,
}: {
  t: TranslationFunction;
  settings: CollapsibleListPluginEditorConfig;
  isMobile: boolean;
  locale: string;
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  const componentData = {
    ...DEFAULTS,
    config: { ...DEFAULTS.config, direction: isRtl(locale) ? directions.RTL : directions.LTR },
  };
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: 'CollapsibleList_InsertButton',
      getLabel: () => t('CollapsibleList_InsertButton'),
      tooltip: t('CollapsibleListPlugin_InsertButton_Tooltip'),
      getIcon: () => icon,
      isActive: () => false,
      isDisabled: () => false,
      componentData,
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      section: 'BlockToolbar_Section_Advanced',
    },
  ];
};
export default createInsertButtons;
