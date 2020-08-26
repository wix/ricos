import { BUTTONS } from 'wix-rich-content-editor-common';
import { CreateInlineButtons } from 'wix-rich-content-common';

const createInlineButtons: CreateInlineButtons<'settings' | 'isMobile' | 't'> = () => {
  return [
    {
      keyName: 'delete',
      type: BUTTONS.DELETE,
      mobile: true,
    },
  ];
};

export default createInlineButtons;
