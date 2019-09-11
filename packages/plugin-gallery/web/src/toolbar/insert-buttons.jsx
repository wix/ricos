// @flow
import { TOOLBARS } from 'wix-rich-content-common';
import { getDefault } from './../gallery-component';
import { InsertPluginIcon } from '../icons';

const createInsertButtons /*: CreateInsertButtons */ = ({ helpers, t }) => {
  return [
    {
      type: 'file',
      multi: true,
      name: 'Gallery',
      tooltipText: t('GalleryPlugin_InsertButton_Tooltip'),
      Icon: InsertPluginIcon,
      componentData: getDefault(),
      helpers,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
    },
  ];
};

export default createInsertButtons;
