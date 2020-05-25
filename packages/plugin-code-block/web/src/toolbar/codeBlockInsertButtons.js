import { TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { CodeBlockIcon } from '../icons';

export default ({ helpers, t, addBlockHandler, icon }) => {
  return [
    {
      type: BUTTON_TYPES.CUSTOM_BLOCK,
      name: 'CodeblockPlugin_InsertButton',
      addBlockHandler,
      tooltipText: t('TextCodeBlock_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: icon || CodeBlockIcon,
      helpers,
      t,
    },
  ];
};
