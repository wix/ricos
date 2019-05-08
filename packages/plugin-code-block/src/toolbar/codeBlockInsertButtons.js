import { TOOLBARS } from 'wix-rich-content-common';
import { CodeBlockIcon } from '../icons';

export default ({ helpers, t, addBlockHandler }) => {
  return [
    {
      name: 'code-block',
      type: 'custom-block',
      addBlockHandler,
      tooltipText: t('TextCodeBlock_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: CodeBlockIcon,
      helpers,
      t,
    },
  ];
};
