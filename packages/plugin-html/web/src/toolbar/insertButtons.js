// @flow
import { TOOLBARS } from 'wix-rich-content-common';
import { DEFAULTS } from '../HtmlComponent';
import { InsertPluginIcon } from '../icons';

const createInsertButtons /*: CreateInsertButtons */ = ({ helpers, t }) => {
  return [
    {
      name: 'HTML',
      tooltipText: t('HtmlPlugin_InsertButton_Tooltip'),
      Icon: InsertPluginIcon,
      componentData: DEFAULTS,
      helpers,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
    },
  ];
};

export default createInsertButtons;
