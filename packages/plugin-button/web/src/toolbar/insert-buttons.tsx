import { TOOLBARS } from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import { getDefaultComponentData } from '../defaults';

const createInsertButtons: CreateInsertButtons<'helpers' | 't' | 'settings' | 'customTooltip'> = ({
  helpers,
  t,
  settings,
  customTooltip,
}) => {
  const Icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  const rel = settings?.relValue === '_nofollow';
  const target = settings?.anchorTarget ? settings?.anchorTarget === '_blank' : true;
  return [
    {
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

export default createInsertButtons;
