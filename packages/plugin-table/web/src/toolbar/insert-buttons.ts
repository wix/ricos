import { TOOLBARS } from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import { CreateInsertButtons } from 'wix-rich-content-common';

const createInsertButtons: CreateInsertButtons<'helpers' | 't' | 'settings'> = ({ helpers, t }) => {
  return [
    {
      type: 'file',
      multi: true,
      name: 'Table',
      tooltipText: 'Create a table',
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: InsertPluginIcon,
      // componentData: DEFAULTS,
      helpers,
      t,
    },
  ];
};

export default createInsertButtons;
