import { DEFAULTS } from '../accordion-component';
import { TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import InsertPluginIcon from '../icons/InsertPluginIcon';
import { CreateInsertButtons } from 'wix-rich-content-common';

const createInsertButtons: CreateInsertButtons<'t' | 'settings' | 'isMobile'> = ({
  t,
  settings,
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: 'accordion_InsertButton',
      getLabel: () => t('accordion_InsertButton'),
      tooltip: t('accordion_Tooltip'),
      getIcon: () => icon,
      isActive: () => false,
      isDisabled: () => false,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
    },
  ];
};
export default createInsertButtons;
