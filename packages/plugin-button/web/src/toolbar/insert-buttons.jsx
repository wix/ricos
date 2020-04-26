import { TOOLBARS } from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import { getDefaultComponentData } from '../defaults';
import { LINK_BUTTON_TYPE } from '../constants';

export default ({ helpers, t, settings, type }) => {
  const Icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  const rel = settings?.relValue === '_nofollow';
  const target = settings?.anchorTarget ? settings?.anchorTarget === '_blank' : true;
  return [
    {
      name: 'Button',
      tooltipText:
        LINK_BUTTON_TYPE === type
          ? t('LinkButtonPlugin_InsertButton_Tooltip')
          : t('ActionButtonPlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon,
      componentData: getDefaultComponentData(rel, target),
      helpers,
      t,
    },
  ];
};
