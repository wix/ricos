import { TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import { getDefaultComponentData } from '../defaults';

export default ({ helpers, t, settings, customTooltip }) => {
  const Icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  const rel = settings?.relValue === '_nofollow';
  const target = settings?.anchorTarget ? settings?.anchorTarget === '_blank' : true;
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: 'ButtonPlugin_InsertButton',
      tooltipText: customTooltip || t('ButtonPlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon,
      componentData: getDefaultComponentData(rel, target),
      helpers,
      t,
    },
  ];
};
