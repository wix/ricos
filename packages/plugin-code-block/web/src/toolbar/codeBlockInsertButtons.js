import { TOOLBARS } from 'wix-rich-content-editor-common';
import { CodeBlockIcon } from '../icons';

export default ({ helpers, t, addBlockHandler, icon }) => {
  return [
    {
      name: 'code-block',
      type: 'custom-block',
      addBlockHandler,
      tooltipText: t('TextCodeBlock_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: icon || CodeBlockIcon,
      helpers,
      t,
    },
  ];
};
