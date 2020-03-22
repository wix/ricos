import { TOOLBARS } from 'wix-rich-content-editor-common';
import { DEFAULTS } from './../gallery-component';
import { InsertPluginIcon } from '../icons';

export default ({ helpers, t, settings }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: 'file',
      multi: true,
      name: t('Mobile_GalleryPlugin_InsertButton'),
      tooltipText: t('GalleryPlugin_InsertButton_Tooltip'),
      Icon: icon,
      componentData: DEFAULTS,
      helpers,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
    },
  ];
};
