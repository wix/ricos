import { TOOLBARS } from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import { defaultContentState } from '../constants';

export default ({ helpers, t, settings }) => {
  const Icon = settings?.toolbar?.icons?.Button || InsertPluginIcon;
  const rel = settings?.relValue === '_nofollow';
  const target = settings?.anchorTarget ? settings?.anchorTarget === '_blank' : true;
  return [
    {
      name: 'Button',
      tooltipText: t('ButtonPlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon,
      componentData: defaultContentState(rel, target),
      helpers,
      t,
    },
  ];
};
