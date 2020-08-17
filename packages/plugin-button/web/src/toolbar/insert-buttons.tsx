import { INSERT_PLUGIN_BUTTONS, TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import { getDefaultComponentData } from '../defaults';
import { CreateInsertButtons } from 'wix-rich-content-common';

const createInsertButtons: CreateInsertButtons<'t' | 'settings' | 'customTooltip'> = ({
  t,
  settings,
  customTooltip,
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  const rel = settings?.relValue === '_nofollow';
  const target = settings?.anchorTarget ? settings?.anchorTarget === '_blank' : true;
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: INSERT_PLUGIN_BUTTONS.BUTTON,
      tooltip: customTooltip || t('ButtonPlugin_InsertButton_Tooltip'),
      getIcon: () => icon,
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      componentData: getDefaultComponentData(rel, target),
    },
  ];
};

export default createInsertButtons;
