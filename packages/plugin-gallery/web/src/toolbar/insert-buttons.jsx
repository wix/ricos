// @flow
import { TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../gallery-component';
import { InsertPluginIcon } from '../icons';

const createInsertButtons /*: CreateInsertButtons */ = ({ helpers, t, settings }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.FILE,
      multi: true,
      name: 'GalleryPlugin_InsertButton',
      tooltipText: t('GalleryPlugin_InsertButton_Tooltip'),
      Icon: icon,
      componentData: DEFAULTS,
      helpers,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
    },
  ];
};

export default createInsertButtons;
